import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ClassInfoArray, ClassInfo} from '../models/class-info.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private classes = new BehaviorSubject<ClassInfoArray>(new ClassInfoArray());
  cast = this.classes.asObservable();

  constructor() {
  }

  editUser(weekClasses: ClassInfoArray) {
    this.classes.next(weekClasses);
  }

  getFallSequence() {
    const studentProfile = JSON.parse(localStorage.getItem('studentProfile'));
   if (studentProfile.courseCart["Fall 2017"] === undefined) {
     studentProfile.courseCart.set("Fall 2017");
   }
   else {
     return studentProfile.courseCart["Fall 2017"];
   }
  }

  getWinterSequence() {
    const studentProfile = JSON.parse(localStorage.getItem('studentProfile'));
    return studentProfile.courseCart["Winter 2018"];
  }

  getSummerSequence() {
    const studentProfile = JSON.parse(localStorage.getItem('studentProfile'));
    return studentProfile.courseCart["Summer 2018"];
  }

  parseSequence(semester: string) {
    let sequence;
    let calendarCourses: ClassInfoArray = new ClassInfoArray();
    if (semester == 'Fall 2017') {
      sequence = this.getFallSequence()
    } else if (semester == 'Winter 2018') {
      sequence = this.getWinterSequence()
    } else if (semester == "Summer 2018") {
      sequence = this.getSummerSequence()
    } else {
      sequence = [];
    }
    console.log(localStorage.getItem('studentProfile'));
    console.log(sequence);
    for (let course of sequence) {
      let courseName = course.courseSubject + " " + course.courseCatalog;
      let numberLectures = course.lectureDays.length;
      for (let counter = 0; counter < numberLectures; counter++) {
        calendarCourses.classInfo.push(new ClassInfo(course.lectureStart, course.lectureEnd,
          courseName, course.lectureSection.replace(" ", ""), course.lectureDays[counter]));
      }
      if (course.tutorialSection != "") {
        calendarCourses.classInfo.push(new ClassInfo(course.tutorialStart, course.tutorialEnd,
          courseName, course.tutorialSection.replace(" ", ""), course.tutorialDays[0]));
      }
      if (course.labSection != ""){
        calendarCourses.classInfo.push(new ClassInfo(course.labStart, course.labEnd,
          courseName, course.labSection.replace(" ", ""), course.labDays[0]));
      }
    }
    console.log(calendarCourses.classInfo);
    let x = new ClassInfoArray();
    x.classInfo.push(new ClassInfo(1400, 1500, 'COEN250',"", 1));
    this.editUser(x);
  }
}
