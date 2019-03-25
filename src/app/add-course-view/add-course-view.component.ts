import {Component, OnInit} from '@angular/core';
import {Course} from './course.model';
import {COURSELIST} from './course-list.model';

@Component({
  selector: 'app-add-course-view-component',
  templateUrl: './add-course-view.component.html',
  styleUrls: ['./add-course-view.component.css']
})
export class AddCourseViewComponent implements OnInit {
  courses = COURSELIST;
  selectedCourse: Course;
  semesterList: Course[] = [];
  nameList: Course[] = [];
  codeList: Course[] = [];
  basket: Course[] = [];
  input: string;
  /** Method to return a list from a source list with no duplicate object attributes. For example, if the source list has two course with
   * the 'COMP' name, only one of them will be included in the returned list. The selected course is also included int eh returned list.
   *
   * @param srcList - The list of course to extract from.
   * @param course - The selected course.
   * @param attribute - The attribute to base the returned list on.
   * @returns Course[] - The list with no duplicates.
   */
  static genList(srcList: Course[], course: Course, attribute: string): Course[] {
    const list: Course[] = [];
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
   * @returns Course[] - the filtered list.
   */
  static filter( list: Course[], val: string, attribute: string): Course[] {
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
    this.semesterList = AddCourseViewComponent.genList(this.courses, this.selectedCourse, 'semester');
  }
  /** Method that is executed upon selecting a course from a drop down list. It will will set the value of the selected course and generate
   * a list of name and codes for this course.
   *
   * @param course - The selected course.
   * @returns void
   */
  onSelect(course: Course): void {
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
  onSemesterSelect(course: Course): void {
    this.onSelect(course);
    this.clearInput();
    this.emptyBasket();
  }
  /** Method that adds a course to the basket. The course is added if it is not already in the basket.
   *
   * @param course - The course to add.
   * @returns void
   */
  addToBasket(course: Course): void {
    if (!this.basket.includes(course)) {
      this.basket.push(course);
    }
  }
  /** Method that removes a course to the basket.
   *
   * @param course - The course to remove.
   * @returns void
   */
  removeFromBasket(course: Course): void {
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
  displayCode(course: Course): string {
    if (course) {
      return course.code;
    }
  }
}
