import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from '../../../models/course.model';
import {COURSELIST} from '../../../models/course-list.model';
import {CourseService} from '../../../add-course-service/add-course.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-course-component',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  courses: AddCourseModel[] = [];
  selectedCourse: AddCourseModel;
  semesterList: AddCourseModel[] = [];
  nameList: AddCourseModel[] = [];
  codeList: AddCourseModel[] = [];
  input: string;
  messages: string[];
  // Local subscription object to manipulate subscription and !PREVENT MEMORY LEAKS!
  // This is a local service property that is set equal to the service that is injected below
  private messageSubscription: Subscription;
  private courseSubscription: Subscription;
  courseService: CourseService;
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  /** Method to return a list from a source list with no duplicate object attributes. For example, if the source list has two course with
   * the 'COMP' name, only one of them will be included in the returned list. The selected course is also included int eh returned list.
   *
   * @param srcList - The list of course to extract from.
   * @param course - The selected course.
   * @param attribute - The attribute to base the returned list on.
   * @returns AddCourseModel[] - The list with no duplicates.
   */
  static genList(srcList: AddCourseModel[], course: AddCourseModel, attribute: string): AddCourseModel[] {
    const list: AddCourseModel[] = [];
    const stringList: string[] = [];
    if (course !== undefined) {
      list.push(course);
      stringList.push(course[attribute]);
    }
    for (let i = 0; i < srcList.length; i++) {
      if (!list.includes(srcList[i]) && !stringList.includes(srcList[i][attribute])) {
        list.push(srcList[i]);
        stringList.push(srcList[i][attribute]);
      }
    }
    return list;
  }

  /** Method to filter a source list of course by their attributed based on an input string.
   *
   * @param list - The list of course to filter.
   * @param val - The value used as a filter.
   * @param attribute - The attribute to filter the course list on.
   * @returns AddCourseModel[] - the filtered list.
   */
  static filter(list: AddCourseModel[], val: string, attribute: string): AddCourseModel[] {
    if (val) {
      const filterValue = val.toString().toLowerCase();
      return list.filter(course => course[attribute].toLowerCase().startsWith(filterValue));
    }
    return list;
  }

  /** Generates a list of semesters on page load and subscribes to the http response messages from addCourse.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.semesterList = AddCourseComponent.genList(this.courses, this.selectedCourse, 'semester');
    this.courseService.getCourses();
    this.messageSubscription = this.courseService.getMessageUpdateListener().subscribe((message: string[]) => {
      this.messages = message;
    });
    this.courseSubscription = this.courseService.getCoursesUpdateListener().subscribe((courses: AddCourseModel[]) => {
      this.courses = courses;
    });
  }

  /** Method that is executed upon selecting a course from a drop down list. It will will set the value of the selected course and generate
   * a list of name and codes for this course.
   *
   * @param course - The selected course.
   * @returns void
   */
  onSelect(course: AddCourseModel): void {
    this.selectedCourse = course;
    this.nameList = AddCourseComponent.filter(this.courses, this.selectedCourse.semester, 'semester');
    this.nameList = AddCourseComponent.genList(this.nameList, this.selectedCourse, 'name');
    this.codeList = AddCourseComponent.filter(this.courses, this.selectedCourse.name, 'name');
    this.codeList = AddCourseComponent.genList(this.codeList, this.selectedCourse, 'code');
  }

  /** Method that is executed upon selecting a semester. Calls onSelect, resets the code input and empties the basket.
   *
   * @param course - The selected semester.
   * @returns void
   */
  onSemesterSelect(course: AddCourseModel): void {
    this.onSelect(course);
    this.clearInput();
    this.courseService.clearCourse();
  }

  /** Method generates a list of course for the autocomplete dropdown list of the code input.
   *
   * @param input - Text in the course code input field.
   * @returns void
   */
  genAutocompleteList(input: string): void {
    let list = AddCourseComponent.filter(this.courses, this.selectedCourse.name, 'name');
    list = AddCourseComponent.genList(list, this.selectedCourse, 'code');
    this.codeList = AddCourseComponent.filter(list, input, 'code');
  }

  /** Clears the input of the course code.
   * @returns void
   */
  clearInput(): void {
    this.input = null;
  }

  /** Returns the code of the passed course. Useful for the autocomplete field.
   *
   * @param course - The course from which the code will be returned.
   * @returns string - The course's code.
   */
  displayCode(course: AddCourseModel): string {
    if (course) {
      return course.code;
    }
  }
  /** Add an input course to the basket using the service method addCourse. Displays an appropriate message based on the input or the
   * result of addCourse.
   *
   * @param course - The course to add to the basket.
   * @returns void
   */
  onSubmit(course: AddCourseModel) {
      this.courseService.addCourse(course);
  }
  /** Unsubscribe from the message to prevent memory leaks when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
