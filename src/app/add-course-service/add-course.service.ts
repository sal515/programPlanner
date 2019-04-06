// This is a service to handle data from the database or the Courses
// This service needs to be exported for other components to use it
// Then to use this service in other components:
// It must be injected to components that needs to use it

import {Injectable} from '@angular/core';
import {AddCourseModel} from '../models/course.model';
// importing the http client to inject it to the service, Remember: !HttpClientModule! needs to be added in main!
import {HttpClient} from '@angular/common/http';

// rxjs allows us to code event-driven programs,
// Usage example: update the data array in this service based on changes in other components
// This allows us to pass the data array in this service by reference
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {response} from 'express';

// The @Injectable({providedIn: 'root'}) === Importing the service in the module.ts file in the provided array
@Injectable({providedIn: 'root'})
export class CourseService {
  private courseAddURL = 'http://localhost:3000/algorithms/addCourseToSequence';
  private getCourseURL = 'http://localhost:3000/algorithms/getCourses';
  private basket: AddCourseModel[] = [];
  private courses: AddCourseModel[] = [];
  private messages: string[] = [];
  private basketUpdated = new Subject<AddCourseModel[]>();
  private coursesUpdated = new Subject<AddCourseModel[]>();
  private messagesUpdated = new Subject<string[]>();
  private httpClient: HttpClient;


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }


  getCourses(): void {
    // array passed by value
    // ( preferred method so that different components doesn't modify the array randomly)
    // return [...this.basket];
    // array passed by reference
    // return this.basket;

    // Angular http clients uses observables, so needs to be subscribed to listen
    // We don't have to unsubscribe observables that are build into Angular to prevent memory leaks, its Handled!
    // We only need to unsubscribe observables that are created by us
    this.httpClient.get <{ coursesArrayOfMaps: string }>(this.getCourseURL).subscribe((courseData) => {
        const arr = JSON.parse(courseData.coursesArrayOfMaps);
        this.courses = arr.map(course =>
          ({semester : course.termDescription, name : course.courseSubject, code : course.courseCatalog}));
        // adding our own observable to the coursesArray
        this.coursesUpdated.next([...this.courses]);
      }
      // REMEMBER : To take care of the proper headers on the server-side response to take care of CORS.
    );
  }
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
  /** Removes a course from the course array.
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
  getBasketUpdateListener(): Observable<AddCourseModel[]> {
    return this.basketUpdated.asObservable();
  }
  getCoursesUpdateListener(): Observable<AddCourseModel[]> {
     return this.coursesUpdated.asObservable();
  }
  getMessageUpdateListener(): Observable<string[]> {
    return this.messagesUpdated.asObservable();
  }
  /** Clears the course array.
   *
   * @returns void
   */
  clearCourse(): void {
    this.basket = [];
    this.basketUpdated.next([...this.basket]);
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
}
