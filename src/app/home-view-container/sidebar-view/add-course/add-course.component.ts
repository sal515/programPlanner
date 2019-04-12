import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from '../../../models/course.model';
import {CourseService} from '../../../add-course-service/add-course.service';
import {Subscription} from 'rxjs';
import {ClassesService} from "../../../classes-service/classes.service";
import {HomeViewContainerComponent} from '../../home-view-container.component';

@Component({
  selector: 'app-add-course-component',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit, OnDestroy {
  // Course to be sent to the backend.
  selectedCourse: AddCourseModel;
  // Lists to contains the courses generated from the backend.
  courses: AddCourseModel[];
  semesterList: AddCourseModel[] = [];
  nameList: AddCourseModel[] = [];
  codeList: AddCourseModel[] = [];
  lectureList: AddCourseModel[] = [];
  labList: AddCourseModel[] = [];
  tutorialList: AddCourseModel[] = [];
  // Validation booleans
  lecSelected: boolean;
  tutSelected: boolean;
  labSelected: boolean;
  // User's input for the code.
  input: string;
  // Message array based on the backend's response codes.
  messages: string[];
  // Subscriptions.
  private messageSubscription: Subscription;
  private courseSubscription: Subscription;
  private semesterSubscription: Subscription;
  private lectureSubscription: Subscription;
  private labSubscription: Subscription;
  private tutSubscription: Subscription;
  // Add course service
  courseService: CourseService;
  // Constructor
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  /**
   * Method to return a list from a source list with no duplicate object attributes. For example, if the source list has two course with
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

  /**
   * Method to filter a source list of course by their attributed based on an input string.
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

  /**
   * Subscribing to a bunch of stuff.
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
    this.lecSelected = false;
    this.tutSelected = false;
    this.labSelected = false;
  }

  /**
   * Method that is executed upon selecting a course from a drop down list. It will will set the value of the selected course and generate
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
   * Takes a list of sections for lectures, labs, and tutorials sent by the backend.
   * Generates a list of all possible sections for each.
   *
   * @returns void
   */
  onSelectName(course: AddCourseModel): void {
    this.onSelect(course);
   // this.clearAll();
  }

  /**
   * Takes a list of sections for lectures, labs, and tutorials sent by the backend.
   * Generates a list of all possible sections for each.
   *
   * @returns void
   */
  onSelectCode(course: AddCourseModel): void {
    this.onSelect(course);
    this.courseService.getLecture(course);
    this.labList = null;
    this.tutorialList = null;
  }

  /**
   * Generates a list of tutorial and a list of labs based on the selected lecture.
   *
   * @params course - the selected lecture.
   * @returns void
   */
  onSelectLectureSection(course: AddCourseModel): void {
    this.selectedCourse = course;
    this.courseService.getLabAndTut(course);
    this.lecSelected = true;
  }

  /**
   * Selects a tutorial.
   *
   * @params course - the selected tutorial.
   * @returns void
   */
  onSelectTutorialSections(course: AddCourseModel): void {
    this.selectedCourse.tutorialSection = course.tutorialSection;
    this.tutSelected = true;
  }

  /**
   * Selects a lab.
   *
   * @params course - the selected lab.
   * @returns void
   */
  onSelectLabSections(course: AddCourseModel): void {
    this.selectedCourse.labSection = course.labSection;
    this.labSelected = true;
  }

  /**
   * Method that is executed upon selecting a semester. Calls onSelect and reset the user input.
   *
   * @param course - The selected termDescription.
   * @returns void
   */
  onSemesterSelect(course: AddCourseModel): void {
    const x = new ClassesService().parseSequence(course.termDescription);
    new HomeViewContainerComponent().updateCalendar(x);
    this.onSelect(course);
    this.courseService.getUserCart(course);
    //this.clearAll();
  }

  /**
   * Method generates a list of course for the autocomplete dropdown list of the courseCatalog input.
   *
   * @param input - Text in the course courseCatalog input field.
   * @returns void
   */
  genAutocompleteList(input: string): void {
    let list = AddCourseComponent.filter(this.courses, this.selectedCourse.courseSubject, 'courseSubject');
    list = AddCourseComponent.genList(list, this.selectedCourse, 'courseCatalog');
    this.codeList = AddCourseComponent.filter(list, input, 'courseCatalog');
  }

  /**
   * Returns the courseCatalog of the passed course. Useful for the autocomplete field.
   *
   * @param course - The course from which the courseCatalog will be returned.
   * @returns string - The course's courseCatalog.
   */
  displayCode(course: AddCourseModel): string {
    if (course) {
      return course.courseCatalog;
    }
  }

  /**
   * Clears the lecture, lab and tutorial list and reset their validation booleans. Clears the input field.
   *
   * @returns void
   */
  clearAll(): void {
    this.input = null;
    this.lectureList = [];
    this.tutorialList = [];
    this.labList = [];
    this.lecSelected = false;
    this.tutSelected =  false;
    this.labSelected = false;
  }

  /**
   * Executed upon submitting the form, submit the input course to the backend.
   *
   * @param course - The course to add to the backend.
   * @returns void
   */
  onSubmit(course: AddCourseModel): void {
      this.courseService.addCourse(course);
  }

  /**
   * Unsubscribe from the message to prevent memory leaks when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.courseSubscription.unsubscribe();
    this.semesterSubscription.unsubscribe();
    this.labSubscription.unsubscribe();
    this.tutSubscription.unsubscribe();
    this.lectureSubscription.unsubscribe();
  }
}
