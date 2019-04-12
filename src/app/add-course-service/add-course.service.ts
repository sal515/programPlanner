import {Injectable} from '@angular/core';
import {AddCourseModel} from '../models/course.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication-service-guards/authentication.service';
import {ClassesService} from '../classes-service/classes.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  // Backend URLs
  private courseAddURL = 'http://localhost:3000/algorithms/addCourseToSequence';
  private getCourseURL = 'http://localhost:3000/algorithms/getCourses';
  private getLectureSectionURL = 'http://localhost:3000/algorithms/getLecturesSections';
  private getLabAndTutSectionURL = 'http://localhost:3000/algorithms/getTutLabsSections';
  private courseRemoveURL = 'http://localhost:3000/removeCourse';
  private getCartURL = 'http://localhost:3000/algorithms/getCourseCart';
  // Current user's ID
  private userID: string;
  // HTTP client
  private httpClient: HttpClient;
  // Local course arrays
  private basket: AddCourseModel[] = [];
  private courses: AddCourseModel[] = [];
  private semesters: AddCourseModel[] = [];
  private lectures: AddCourseModel[] = [];
  private labs: AddCourseModel[] = [];
  private tuts: AddCourseModel[] = [];
  private messages: string[] = [];
  // Local course arrays listeners
  private basketUpdated = new Subject<AddCourseModel[]>();
  private coursesUpdated = new Subject<AddCourseModel[]>();
  private semestersUpdated = new Subject<AddCourseModel[]>();
  private lecturesUpdated = new Subject<AddCourseModel[]>();
  private labsUpdated = new Subject<AddCourseModel[]>();
  private tutsUpdated = new Subject<AddCourseModel[]>();
  private messagesUpdated = new Subject<string[]>();
  // Authentication service to get the uses ID
  AuthenticationService: AuthenticationService;
  // Constructor
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
            lectureSection: 'none',
            tutorialSection: 'none',
            labSection: 'none'
          };
          this.courses.push(course);
        }
        this.genSemesterList(this.courses);
        this.semestersUpdated.next([...this.semesters]);
      this.coursesUpdated.next([...this.courses]);
      }
    );
  }
  /**
   * Generates a list of lecture based on the given course's code.
   *
   * @param inputCourse - the course with the lecture.
   * @returns void
   */
  getLecture(inputCourse: AddCourseModel): void {
    this.httpClient.post <{ lectureSection: string[] }>(this.getLectureSectionURL, inputCourse).subscribe((courseData) => {
          this.lectures = [];
          const map = new Map(JSON.parse(courseData.lectureSection[0]));
          const lecArray = Array.from(map.keys());
          if (lecArray.length === 0) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: inputCourse.lectureSection,
              tutorialSection: 'none',
              labSection: inputCourse.lectureSection,
            };
            this.lectures.push(course);
          }
          for (let i = 0; i < lecArray.length; i++) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: lecArray[i],
              tutorialSection: inputCourse.tutorialSection,
              labSection: inputCourse.labSection
            };
            this.lectures.push(course);
          }
        this.lecturesUpdated.next(this.lectures);
        }
    );
  }
  /**
   * Generates a list of tutorial and a list of lab based on a given course's lecture.
   *
   * @param inputCourse - the course with the lecture.
   * @returns void
   */
  getLabAndTut(inputCourse: AddCourseModel): void {
    this.httpClient.post <{
      tutorialSection: string[],
      labSection: string[]
    }>(this.getLabAndTutSectionURL, {
      userID: this.userID,
      termDescription: inputCourse.termDescription,
      courseSubject: inputCourse.courseSubject,
      courseCatalog: inputCourse.courseCatalog,
      componentCode: inputCourse.lectureSection
    }).subscribe((courseData) => {
          this.tuts = [];
          this.labs = [];
          console.log('We got here');
          const tutMap = new Map(JSON.parse(courseData.tutorialSection[0]));
          const tutArray = Array.from(tutMap.keys());
          const labMap = new Map(JSON.parse(courseData.labSection[0]));
          const labArray = Array.from(labMap.keys());
          if (tutArray.length === 0) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: inputCourse.lectureSection,
              tutorialSection: 'none',
              labSection: inputCourse.lectureSection,
            };
            this.tuts.push(course);
          }
          if (labArray.length === 0) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: inputCourse.lectureSection,
              tutorialSection: inputCourse.tutorialSection,
              labSection: 'none',
            };
            this.labs.push(course);
          }
          for (let i = 0; i < tutArray.length; i++) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: inputCourse.lectureSection,
              tutorialSection: tutArray[i],
              labSection: inputCourse.lectureSection,
            };
            this.tuts.push(course);
          }
          for (let i = 0; i < labArray.length; i++) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: inputCourse.courseSubject,
              courseCatalog: inputCourse.courseCatalog,
              lectureSection: inputCourse.lectureSection,
              tutorialSection: inputCourse.tutorialSection,
              labSection: labArray[i],
            };
            this.labs.push(course);
          }
        this.tutsUpdated.next(this.tuts);
        this.labsUpdated.next(this.labs);
        }

    );
  }
  /**
   * Retrieves the user's course cart based on their ID and the input course's semester.
   *
   * @param inputCourse - the course with the semester.
   * @returns void
   */
  getUserCart(inputCourse: AddCourseModel): void {
    this.httpClient.post<({coursesCartArr: string[]})>(this.getCartURL, {
      termDescription: inputCourse.termDescription,
      userID: inputCourse.userID
    }).subscribe((responseData) => {
        this.basket = [];
        if(responseData.coursesCartArr != null) {
          for (let i = 0; i < responseData.coursesCartArr.length; i++) {
            const course: AddCourseModel = {
              userID: this.userID,
              termDescription: inputCourse.termDescription,
              courseSubject: responseData.coursesCartArr[i].slice(0, 4),
              courseCatalog: responseData.coursesCartArr[i].slice(4, 8),
              lectureSection: inputCourse.lectureSection,
              tutorialSection: inputCourse.tutorialSection,
              labSection: inputCourse.labSection
            };
            this.basket.push(course);
          }
          this.basketUpdated.next(this.basket);
        }
      }
    );
  }
  /**
   * Adds a course to the user's profile. Also adds messages to the message array based on the response of the POST request.
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
      notifyCalenderBool: boolean,
      studentProfile: object
    })>(this.courseAddURL, course).subscribe((responseData) => {
        this.clearMessages();
        if (!responseData.isCourseGivenDuringSemesterBool || !responseData.hasPreReqBool || responseData.alreadyInCartBool) {
          if (responseData.alreadyInCartBool) {
            this.messages.push('Error: Course already in cart.');
          } else {
            if (!responseData.isCourseGivenDuringSemesterBool) {
              this.messages.push('Error: Course not available for this semester.');
            }
            if (!responseData.hasPreReqBool) {
              this.messages.push('Error: Missing one or more pre-requisites.');
            }
          }
          this.messagesUpdated.next([...this.messages]);
          setTimeout(() => {
            this.clearMessages();
            }, 3000);
        } else {
          this.basket.push(course);
          this.basketUpdated.next([...this.basket]);
          this.messages.push('Course successfully added.');
          if (!responseData.notTakenBool && !responseData.alreadyInCartBool) {
            this.messages.push('Warning: course has already been taken.');
          }
          this.messagesUpdated.next([...this.messages]);
          setTimeout(() => {
            this.clearMessages();
            }, 3000);
          if (responseData.studentProfile != null) {
            localStorage.setItem('studentProfile', JSON.stringify(responseData.studentProfile));
          }
          new ClassesService().parseSequence(course.termDescription);
        }
      }
    );
  }

  /**
   * Removes a course from the course array ***WIP***.
   *
   * @param course - The course to be removed.
   * @returns void
   */
  removeCourse(course: AddCourseModel): void {
    this.clearMessages();
    this.httpClient.post<({message: string, studentProfile: object})>(this.courseRemoveURL, course).subscribe((responseData) => {
        this.clearMessages();
        const index = this.basket.indexOf(course);
        if (index >= 0) {
          this.basket.splice(index, 1);
        }
        this.basketUpdated.next([...this.basket]);
        this.messages.push('Course successfully removed.');
        if (responseData.studentProfile != null) {
          localStorage.setItem('studentProfile', JSON.stringify(responseData.studentProfile));
        }
        new ClassesService().parseSequence(course.termDescription);
        setTimeout(() => {this.clearMessages(); }, 3000);
      }
    );
  }

  /**
   * Creates an observable for the basket.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getBasketUpdateListener(): Observable<AddCourseModel[]> {
    return this.basketUpdated.asObservable();
  }

  /**
   * Creates an observable for the course list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getCoursesUpdateListener(): Observable<AddCourseModel[]> {
     return this.coursesUpdated.asObservable();
  }

  /**
   * Creates an observable for the semester list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getSemestersUpdateListener(): Observable<AddCourseModel[]> {
    return this.semestersUpdated.asObservable();
  }
  /**
   * Creates an observable for the lecture list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getLectureUpdateListener(): Observable<AddCourseModel[]> {
    return this.lecturesUpdated.asObservable();
  }
  /**
   * Creates an observable for the lab list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getLabUpdateListener(): Observable<AddCourseModel[]> {
    return this.labsUpdated.asObservable();
  }
  /**
   * Creates an observable for the tutorial list.
   *
   * @returns Observable<AddCourseModel[]>
   */
  getTutUpdateListener(): Observable<AddCourseModel[]> {
    return this.tutsUpdated.asObservable();
  }

  /**
   * Creates an observable for the response messages.
   *
   * @returns Observable<string[]>
   */
  getMessageUpdateListener(): Observable<string[]> {
    return this.messagesUpdated.asObservable();
  }

  /**
   * Clears the messages array.
   *
   * @returns void
   */
  clearMessages(): void {
    this.messages = [];
    this.messagesUpdated.next([...this.messages]);
  }
  /**
   * Generate a list of unique semesters from a course array.
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
