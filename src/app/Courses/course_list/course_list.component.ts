import {Component} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';

import {CourseModel} from '../course.model';
import {CourseService} from '../course.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course_list.component.html',
  styleUrls: ['./course_list.component.css']
})

export class CourseListComponent implements OnInit, OnDestroy {

  // Local array container to hold the data retrieved from the service
  courses: CourseModel[] = [];
  // Local subscription object to manipulate subscription and !PREVENT MEMORY LEAKS!
  private courseSubscription: Subscription;
  // This is a local service property that is set equal to the service that is injected below
  courseService: CourseService;

  // This is the dependency injection from the courseArr service
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  ngOnInit(): void {
    // Life Cycle method called only once when the component is created
    // this.courses = this.courseService.getCourse();
    // The following was used to test to get existing courses

    // this.courseService.getCourse();

    // This will be a never ending observable and needs to be destroyed on component destruction
    // This is a component wide observable, observing the course array in service file for changes
    // In case of changes in the array in the service file , the local array here will also be updated
    this.courseSubscription = this.courseService.getCourseUpdateListener().subscribe((courses: CourseModel[]) => {
      this.courses = courses;
    });
  }

  ngOnDestroy(): void {
    // !PREVENT MEMORY LEAKS! by unsubscribe when the component is destroyed.
    this.courseSubscription.unsubscribe();
  }


}
