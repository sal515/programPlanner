import {Injectable} from '@angular/core';
import {AddCourseModel} from '../models/course.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication-service-guards/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private courseAddURL = 'http://localhost:3000/algorithms/addCourseToSequence';
  private getCourseURL = 'http://localhost:3000/algorithms/getCourses';
  private getSectionURL = '';

  readonly userID: string;
  private httpClient: HttpClient;

  private basket: AddCourseModel[] = [];
  private courses: AddCourseModel[] = [];
  private semesters: AddCourseModel[] = [];
  private messages: string[] = [];

  private basketUpdated = new Subject<AddCourseModel[]>();
  private coursesUpdated = new Subject<AddCourseModel[]>();
  private semestersUpdated = new Subject<AddCourseModel[]>();
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
        const userID = this.AuthenticationService.getUserId();
        for (let i = 0; i < courseData.coursesArrayOfMaps.length; i++) {
          const map = new Map(JSON.parse(courseData.coursesArrayOfMaps[i]));
          const course: AddCourseModel = {
            id: userID,
            semester: map.get('termDescription'),
            name: map.get('courseSubject'),
            code: map.get('courseCatalog'),
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

  /** Adds a course to the user's profile. Also adds messages to the message array based on the response of the POST request.
   *
   * @param course - the course to add.
   * @returns void
   */
  addCourse(course: AddCourseModel): void {
    this.httpClient.post<({
      isCourseGivenDuringSemesterBool: boolean,
      hasPreReqBool: boolean,
      hasCoReqBool: boolean,
      notTakenBool: boolean,
      alreadyInCartBool: boolean,
      notifyCalender: boolean
    })>(this.courseAddURL, course).subscribe((responseData) => {
        this.clearMessages();
        if (!responseData.isCourseGivenDuringSemesterBool || !responseData.hasPreReqBool
          || !responseData.hasCoReqBool || !responseData.notTakenBool
          || !responseData.alreadyInCartBool) {
          if (!responseData.isCourseGivenDuringSemesterBool) {
            this.pushMessage('Error: Course not available for this semester.');
          }
          if (!responseData.hasPreReqBool) {
            this.pushMessage('Error: Missing one or more pre-requisites.');
          }
          if (!responseData.hasCoReqBool) {
            this.pushMessage('Error: Missing one or more co-requisites.');
          }
          if (!responseData.notTakenBool) {
            this.pushMessage('Error: Course has already been taken.');
          }
          if (!responseData.alreadyInCartBool) {
            this.pushMessage('Error: Course already in cart.');
          }
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
        } else {
          this.basket.push(course);
          this.basketUpdated.next([...this.basket]);
          this.pushMessage('Course successfully added.');
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
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
    const index = this.basket.indexOf(course);
    if (index >= 0) {
      this.basket.splice(index, 1);
    }
    this.basketUpdated.next([...this.basket]);
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

  /** Creates an observable for the semester list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getSemestersUpdateListener(): Observable<AddCourseModel[]> {
    return this.semestersUpdated.asObservable();
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
      if (!this.semesters.includes(courses[i]) && !stringList.includes(courses[i].semester)) {
        this.semesters.push(courses[i]);
        stringList.push(courses[i].semester);
      }
    }
  }
}
