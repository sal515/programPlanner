import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from '../../../models/course.model';

import {CourseService} from '../../../add-course-service/add-course.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-course-component',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  courses: AddCourseModel[];
  selectedCourse: AddCourseModel;
  semesterList: AddCourseModel[] = [];
  nameList: AddCourseModel[] = [];
  codeList: AddCourseModel[] = [];
  lectureList: AddCourseModel[] = [];
  labList: AddCourseModel[] = [];
  tutorialList: AddCourseModel[] = [];
  input: string;
  messages: string[];

  private messageSubscription: Subscription;
  private courseSubscription: Subscription;
  private semesterSubscription: Subscription;
  private lectureSubscription: Subscription;
  private labSubscription: Subscription;
  private tutSubscription: Subscription;

  courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  /** Method to return a list from a source list with no duplicate object attributes. For example, if the source list has two course with
   * the 'COMP' courseSubject, only one of them will be included in the returned list. The selected course is also included int eh returned
   * list.
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

  /** Subscribing to a bunch of stuff.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.courseSubscription = this.courseService.getCoursesUpdateListener().subscribe((courses: AddCourseModel[]) => {
      this.courses = courses;
    });
    this.semesterSubscription = this.courseService.getSemestersUpdateListener().subscribe((semesters: AddCourseModel[]) => {
      this.semesterList = semesters;
    });
    this.messageSubscription = this.courseService.getMessageUpdateListener().subscribe((messages: string[]) => {
      this.messages = messages;
    });
    this.lectureSubscription = this.courseService.getLectureUpdateListener().subscribe((lectureList: AddCourseModel[]) => {
      this.lectureList = lectureList;
    });
    this.labSubscription = this.courseService.getLabUpdateListener().subscribe((labList: AddCourseModel[]) => {
      this.labList = labList;
    });
    this.tutSubscription = this.courseService.getTutUpdateListener().subscribe((tutList: AddCourseModel[]) => {
      this.tutorialList = tutList;
    });
    this.courseService.getCourses();
  }

  /** Method that is executed upon selecting a course from a drop down list. It will will set the value of the selected course and generate
   * a list of courseSubject and codes for this course.
   *
   * @param course - The selected course.
   * @returns void
   */
  onSelect(course: AddCourseModel): void {
    this.selectedCourse = course;
    this.nameList = AddCourseComponent.filter(this.courses, this.selectedCourse.termDescription, 'termDescription');
    this.nameList = AddCourseComponent.genList(this.nameList, this.selectedCourse, 'courseSubject');
    this.codeList = AddCourseComponent.filter(this.courses, this.selectedCourse.courseSubject, 'courseSubject');
    this.codeList = AddCourseComponent.genList(this.codeList, this.selectedCourse, 'courseCatalog');
  }
  /**
   * Takes a list of sections for lectures, labs, and tutorials sent by the backend
   * Generates a list of all possible sections for each
   */
  onSelectName(course: AddCourseModel): void {
    this.onSelect(course);
    this.clearInput();
  }
  /**
   * Takes a list of sections for lectures, labs, and tutorials sent by the backend
   * Generates a list of all possible sections for each
   */
  onSelectCode(course: AddCourseModel): void {
    this.onSelect(course);
    this.courseService.getLecture(course);
  }
  /** Generates a list of tutorial and a list of labs based on the selected lecture.
   *
   * @params course - the selected lecture.
   */
  onSelectLectureSection(course: AddCourseModel): void {
    this.selectedCourse = course;
    this.courseService.getLabAndTut(course);
    this.selectedCourse.tutorialSection = this.tutorialList[0].tutorialSection;
    this.selectedCourse.labSection = this.tutorialList[0].labSection;
  }
  /** Selects a tutorial or lab.
   *
   * @params course - the selected tutorial or lab.
   */
  onSelectTutorialSections(course: AddCourseModel): void {
    this.selectedCourse.tutorialSection = course.tutorialSection;
  }
  onSelectLabSections(course: AddCourseModel): void {
    this.selectedCourse.labSection = course.labSection;
  }

  /** Method that is executed upon selecting a semester. Calls onSelect and reset the user input.
   *
   * @param course - The selected termDescription.
   * @returns void
   */
  onSemesterSelect(course: AddCourseModel): void {
    this.onSelect(course);
    this.courseService.getUserCart(course);
    this.clearInput();
  }

  /** Method generates a list of course for the autocomplete dropdown list of the courseCatalog input.
   *
   * @param input - Text in the course courseCatalog input field.
   * @returns void
   */
  genAutocompleteList(input: string): void {
    let list = AddCourseComponent.filter(this.courses, this.selectedCourse.courseSubject, 'courseSubject');
    list = AddCourseComponent.genList(list, this.selectedCourse, 'courseCatalog');
    this.codeList = AddCourseComponent.filter(list, input, 'courseCatalog');
  }

  /** Clears the input of the course courseCatalog.
   * @returns void
   */
  clearInput(): void {
    this.input = null;
  }

  /** Returns the courseCatalog of the passed course. Useful for the autocomplete field.
   *
   * @param course - The course from which the courseCatalog will be returned.
   * @returns string - The course's courseCatalog.
   */
  displayCode(course: AddCourseModel): string {
    if (course) {
      return course.courseCatalog;
    }
  }
  displayLecture(course: AddCourseModel): string {
    if (course) {
      return course.lectureSection;
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
    this.courseSubscription.unsubscribe();
    this.semesterSubscription.unsubscribe();
  }
}
