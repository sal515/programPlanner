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
  private courseAddURL = 'http://localhost:3000/frontend/addCourse';
  private _courseArr: AddCourseModel[] = [];
  // This is a reference to a Subject (JS_Object) of type AddCourseModel[] which will allow event driven updates
  private courseUpdated = new Subject<AddCourseModel[]>();
  // reference to the http module imported in the service, !Remember HttpClientModule needs to be added in main!
  private httpClient: HttpClient;
  private message = '';
  private messageUpdated = new Subject<string>();

  // Injecting the HttpClient in this service file using the constructor(varName: HttpClient)
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

// arrays and objects in JS are !!reference types!!
  getCourse(): void {
    // array passed by value
    // ( preferred method so that different components doesn't modify the array randomly)
    // return [...this._courseArr];
    // array passed by reference
    // return this._courseArr;

    // Angular http clients uses observables, so needs to be subscribed to listen
    // We don't have to unsubscribe observables that are build into Angular to prevent memory leaks, its Handled!
    // We only need to unsubscribe observables that are created by us
    this.httpClient.get <{ message: string, courses: AddCourseModel[] }>(this.courseAddURL).subscribe((courseData) => {
        // The json will be extracted automatically by the get function
        this._courseArr = courseData.courses;
        // adding our own observable to the coursesArray
        this.courseUpdated.next([...this._courseArr]);
      }
      // REMEMBER : To take care of the proper headers on the server-side response to take care of CORS.
    );
  }
  addCourse(course: AddCourseModel): void {
    // the following is sending a http post request to the courseAddURL defined above and gets return data -> message of type string
    this.httpClient.post<({message: string})>(this.courseAddURL, course).subscribe(
      (responseData) => {
        // the response data is the message of type string declared above
        console.log(responseData.message);
        this.message = responseData.message;
        this.messageUpdated.next(this.message);
        // updating the local array with the new object received
        this._courseArr.push(course);
        // If data in Service changes,this will pass the updated data by value
        this.courseUpdated.next([...this._courseArr]);
      }
    );
  }
  // This method passes an observable object that can be subscribed in the components
  // This update the data array in this service even though the array is passed by valued
  getCourseUpdateListener(): Observable<AddCourseModel[]> {
    // This will notify all the components that are subscribed, if courseArr changes
    // And the data from the service will be updated in the components subscribed
    return this.courseUpdated.asObservable();
  }
  getMessageUpdateListener(): Observable<string> {
    return this.messageUpdated.asObservable();
  }
  /** Checks if a course is included in the array.
   *
   * @param course - The course to check.
   * @returns boolean - true if included, false if not.
   */
  checkIfIncluded(course: AddCourseModel): boolean {
    return this._courseArr.includes(course);
  }
  /** Removes a course from the course array.
   *
   * @param course - The course to be removed.
   * @returns void
   */
  remove(course: AddCourseModel): void {
    const index = this._courseArr.indexOf(course);
    if (index >= 0) {
      this._courseArr.splice(index, 1);
    }
    this.courseUpdated.next([...this._courseArr]);
  }
  /** Clears the course array, notably when the user change the semester.
   *
   * @returns void
   */
  clear() : void {
    this._courseArr = [];
    this.courseUpdated.next([...this._courseArr]);
  }
}
