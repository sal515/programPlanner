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
  genAutocompleteList(input: string) {
    let list = AddCourseViewComponent.filter(this.courses,  this.selectedCourse.name, 'name');
    list = AddCourseViewComponent.genList(list, this.selectedCourse, 'code');
    this.codeList = AddCourseViewComponent.filter(list,  input, 'code');
  }
  displayCode(course: Course): string {
    return course.code;
  }
}
