import {Injectable} from '@angular/core';
import {AddCourseModel} from '../models/course.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication-service-guards/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private courseAddURL = 'http://localhost:3000/algorithms/addCourseToSequence';
  private getCourseURL = 'http://localhost:3000/algorithms/getCourses';
  private getLectureSectionURL = 'http://localhost:3000/algorithms/getLecturesSections';
  private getLabAndTutSectionURL = 'http://localhost:3000/algorithms/getTutLabsSections';
  private courseRemoveURL = 'http://localhost:3000/removeCourse';
  private getCartURL = 'http://localhost:3000/algorithms/getCourseCart';

  private userID: string;
  private httpClient: HttpClient;

  private basket: AddCourseModel[] = [];
  private courses: AddCourseModel[] = [];
  private semesters: AddCourseModel[] = [];
  private messages: string[] = [];

  private basketUpdated = new Subject<AddCourseModel[]>();
  private coursesUpdated = new Subject<AddCourseModel[]>();
  private semestersUpdated = new Subject<AddCourseModel[]>();
  private lectureUpdated = new Subject<AddCourseModel[]>();
  private labUpdated = new Subject<AddCourseModel[]>();
  private tutUpdated = new Subject<AddCourseModel[]>();
  private messagesUpdated = new Subject<string[]>();

  AuthenticationService: AuthenticationService;

  constructor(httpClient: HttpClient, service: AuthenticationService) {
    this.httpClient = httpClient;
    this.AuthenticationService = service;
  }

  /** Retrieves a course list from the database. Also generates a list of semesters from this list.
   *
   * @returns void
   */
  getCourses(): void {
    this.httpClient.get <{ coursesArrayOfMaps: string[] }>(this.getCourseURL).subscribe((courseData) => {
        this.userID = this.AuthenticationService.getUserId();
        for (let i = 0; i < courseData.coursesArrayOfMaps.length; i++) {
          const map = new Map(JSON.parse(courseData.coursesArrayOfMaps[i]));
          const course: AddCourseModel = {
            userID: this.userID,
            termDescription: map.get('termDescription'),
            courseSubject: map.get('courseSubject'),
            courseCatalog: map.get('courseCatalog'),
            lectureSection: null,
            tutorialSection: null,
            labSection: null
          };
          this.courses.push(course);
          this.coursesUpdated.next([...this.courses]);
        }
        this.genSemesterList(this.courses);
        this.semestersUpdated.next([...this.semesters]);
      }
    );
  }
  getUserCart(randCourse: AddCourseModel): void {
    this.basket = [];
    this.basketUpdated.next(this.basket);
    this.httpClient.post<({coursesCartArr: string[]})>(this.getCartURL, {
      termDescription: randCourse.termDescription,
      userID: randCourse.userID
    }).subscribe((responseData) => {
        this.basket = [];
        for (let i = 0; i < responseData.coursesCartArr.length; i++) {
          const course: AddCourseModel = {
            userID: this.userID,
            termDescription: randCourse.termDescription,
            courseSubject: responseData.coursesCartArr[i].slice(0, 4),
            courseCatalog: responseData.coursesCartArr[i].slice(4, 8),
            lectureSection: randCourse.lectureSection,
            tutorialSection: randCourse.tutorialSection,
            labSection: randCourse.labSection
          };
          this.basket.push(course);
          this.basketUpdated.next(this.basket);
        }
      }
    );
  }

  getLecture(pickedCourse: AddCourseModel): void {
    this.httpClient.post <{ coursesArrayOfMaps: string[] }>(this.getLectureSectionURL, pickedCourse).subscribe((courseData) => {
          const userID = this.AuthenticationService.getUserId();
          for (let i = 0; i < courseData.coursesArrayOfMaps.length; i++) {
            const map = new Map(JSON.parse(courseData.coursesArrayOfMaps[i]));
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: map.get('termDescription'),
              courseSubject: map.get('courseSubject'),
              courseCatalog: map.get('courseCatalog'),
              lectureSection: map.get('lectureSection'),
              tutorialSection: null,
              labSection: null
            };
            this.courses.push(course);
            this.coursesUpdated.next([...this.courses]);
          }
          this.genSemesterList(this.courses);
          this.semestersUpdated.next([...this.semesters]);
        }
    );
  }

  getLabAndTut(pickedCourse: AddCourseModel): void {
    this.httpClient.post <{ coursesArrayOfMaps: string[] }>(this.getLabAndTutSectionURL, pickedCourse).subscribe((courseData) => {
          const userID = this.AuthenticationService.getUserId();
          for (let i = 0; i < courseData.coursesArrayOfMaps.length; i++) {
            const map = new Map(JSON.parse(courseData.coursesArrayOfMaps[i]));
            const course: AddCourseModel = {
              userID: userID,
              termDescription: map.get('termDescription'),
              courseSubject: map.get('courseSubject'),
              courseCatalog: map.get('courseCatalog'),
              lectureSection: map.get('lectureSection'),
              tutorialSection: map.get('tutorialSection'),
              labSection: map.get('labSection')
            };
            this.courses.push(course);
            this.coursesUpdated.next([...this.courses]);
          }
          this.genSemesterList(this.courses);
          this.semestersUpdated.next([...this.semesters]);
        }
    );
  }

  /** Adds a course to the user's profile. Also adds messages to the message array based on the response of the POST request.
   *
   * @param course - the course to add.
   * @returns void
   */
  addCourse(course: AddCourseModel): void {
    this.httpClient.post<({
      isCourseGivenDuringSemesterBool: boolean,
      hasPreReqBool: boolean,
      notTakenBool: boolean,
      alreadyInCartBool: boolean,
      notifyCalenderBool: boolean
    })>(this.courseAddURL, course).subscribe((responseData) => {
        this.clearMessages();
        if (!responseData.isCourseGivenDuringSemesterBool || !responseData.hasPreReqBool || responseData.alreadyInCartBool) {
          if (responseData.alreadyInCartBool) {
            this.pushMessage('Error: Course already in cart.');
          } else {
            if (!responseData.isCourseGivenDuringSemesterBool) {
              this.pushMessage('Error: Course not available for this semester.');
            }
            if (!responseData.hasPreReqBool) {
              this.pushMessage('Error: Missing one or more pre-requisites.');
            }
          }
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
        } else {
          this.basket.push(course);
          this.basketUpdated.next([...this.basket]);
          this.pushMessage('Course successfully added.');
          if (!responseData.notTakenBool && !responseData.alreadyInCartBool) {
            this.pushMessage('Warning: course has already been taken.');
          }
          setTimeout(() => {this.clearMessages(); }, 3000);
        }
      }
    );
  }

  /** Removes a course from the course array ***WIP***.
   *
   * @param course - The course to be removed.
   * @returns void
   */
  removeCourse(course: AddCourseModel): void {
    this.clearMessages();
    this.httpClient.post<({message: string})>(this.courseRemoveURL, course).subscribe((responseData) => {
        this.clearMessages();
        const index = this.basket.indexOf(course);
        if (index >= 0) {
          this.basket.splice(index, 1);
        }
        this.basketUpdated.next([...this.basket]);
        this.pushMessage('Course successfully removed.');
        setTimeout(() => {this.clearMessages(); }, 3000);
      }
    );
  }

  /** Creates an observable for the basket.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getBasketUpdateListener(): Observable<AddCourseModel[]> {
    return this.basketUpdated.asObservable();
  }

  /** Creates an observable for the course list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getCoursesUpdateListener(): Observable<AddCourseModel[]> {
     return this.coursesUpdated.asObservable();
  }

  /** Creates an observable for the termDescription list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getSemestersUpdateListener(): Observable<AddCourseModel[]> {
    return this.semestersUpdated.asObservable();
  }

  getLectureUpdateListener(): Observable<AddCourseModel[]> {
    return this.lectureUpdated.asObservable();
  }

  getLabUpdateListener(): Observable<AddCourseModel[]> {
    return this.labUpdated.asObservable();
  }

  getTutUpdateListener(): Observable<AddCourseModel[]> {
    return this.tutUpdated.asObservable();
  }

  /** Creates an observable for the response messages.
   *
   * @returns Observable<string[]>
   */
  getMessageUpdateListener(): Observable<string[]> {
    return this.messagesUpdated.asObservable();
  }

  /** Clears the messages array.
   *
   * @returns void
   */
  clearMessages(): void {
    this.messages = [];
    this.messagesUpdated.next([...this.messages]);
  }
  /** Push a string to the message list.
   *
   * @param message - the message to push.
   * @returns void
   */
  pushMessage(message: string): void {
    this.messages.push(message);
    this.messagesUpdated.next([...this.messages]);
  }

  /** Generate a list of unique semesters from a course array.
   *
   * @param courses - the source array.
   * @returns void
   */
  genSemesterList(courses: AddCourseModel[]): void {
    const stringList: string[] = [];
    for (let i = 0; i < courses.length; i++) {
      if (!this.semesters.includes(courses[i]) && !stringList.includes(courses[i].termDescription)) {
        this.semesters.push(courses[i]);
        stringList.push(courses[i].termDescription);
      }
    }
  }
}
