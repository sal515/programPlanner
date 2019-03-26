import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from './add-course.model';
import {COURSELIST} from './course-list.model';
import {Subscription} from 'rxjs';
import {CourseService} from './add-course.service';

@Component({
  selector: 'app-add-course-view-component',
  templateUrl: './add-course-view.component.html',
  styleUrls: ['./add-course-view.component.css']
})
export class AddCourseViewComponent implements OnInit, OnDestroy {
  courses = COURSELIST;
  selectedCourse: AddCourseModel;
  semesterList: AddCourseModel[] = [];
  nameList: AddCourseModel[] = [];
  codeList: AddCourseModel[] = [];
  basket: AddCourseModel[] = [];
  input: string;
  courseList: AddCourseModel[] = [];
  // Local subscription object to manipulate subscription and !PREVENT MEMORY LEAKS!
  private courseSubscription: Subscription;
  // This is a local service property that is set equal to the service that is injected below
  courseService: CourseService;
  constructor(courseService: CourseService) {
    this.courseService = courseService;
    this.semesterList = AddCourseViewComponent.genList(this.courses, this.selectedCourse, 'semester');
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
  static filter( list: AddCourseModel[], val: string, attribute: string): AddCourseModel[] {
    if (val) {
      const filterValue = val.toLowerCase();
      return list.filter(course => course[attribute].toLowerCase().startsWith(filterValue));
    }
    return list;
  }
  /** Generates a list of semesters on page load.
   *
   * @returns void
   */
  ngOnInit(): void {

    this.courseSubscription = this.courseService.getCourseUpdateListener().subscribe((courses: AddCourseModel[]) => {
      this.courseList = courses;
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
    this.nameList = AddCourseViewComponent.filter(this.courses,  this.selectedCourse.semester, 'semester');
    this.nameList = AddCourseViewComponent.genList(this.nameList, this.selectedCourse, 'name');
    this.codeList = AddCourseViewComponent.filter(this.courses,  this.selectedCourse.name, 'name');
    this.codeList = AddCourseViewComponent.genList(this.codeList, this.selectedCourse, 'code');
  }
  /** Method that is executed upon selecting a semester. Calls onSelect, resets the code input and empties the basket.
   *
   * @param course - The selected semester.
   * @returns void
   */
  onSemesterSelect(course: AddCourseModel): void {
    this.onSelect(course);
    this.clearInput();
    this.emptyBasket();
  }
  /** Method that adds a course to the basket. The course is added if it is not already in the basket.
   *
   * @param course - The course to add.
   * @returns void
   */
  addToBasket(course: AddCourseModel): void {
    if (!this.basket.includes(course)) {
      this.basket.push(course);
    }
  }
  /** Method that removes a course to the basket.
   *
   * @param course - The course to remove.
   * @returns void
   */
  removeFromBasket(course: AddCourseModel): void {
    const index = this.basket.indexOf(course);
    if (index >= 0) {
      this.basket.splice(index, 1);
    }
  }
  /** Method generates a list of course for the autocomplete dropdown list of the code input.
   *
   * @param input - Text in the course code input field.
   * @returns void
   */
  genAutocompleteList(input: string): void{
    let list = AddCourseViewComponent.filter(this.courses,  this.selectedCourse.name, 'name');
    list = AddCourseViewComponent.genList(list, this.selectedCourse, 'code');
    this.codeList = AddCourseViewComponent.filter(list,  input, 'code');
  }
  /** Clear the input of the course code.
   * @returns void
   */
  clearInput(): void {
    this.input = null;
  }
  /** Empties the basket.
   *
   * @returns void
   */
  emptyBasket(): void {
    this.basket = [];
  }
  /** Return the code of the passed course. Useful for the autocomplete field.
   *
   * @param course - The course from which the code will be returned.
   * @returns string - The course's code.
   */
  displayCode(course: AddCourseModel): string {
    if (course) {
      return course.code;
    }
  }
  ngOnDestroy(): void {
    // !PREVENT MEMORY LEAKS! by unsubscribe when the component is destroyed.
    this.courseSubscription.unsubscribe();
  }
}
