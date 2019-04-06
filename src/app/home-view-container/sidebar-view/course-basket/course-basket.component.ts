import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from '../../../models/course.model';
import {Subscription} from 'rxjs';
import {CourseService} from '../../../add-course-service/add-course.service';

@Component({
  selector: 'app-course-basket-component',
  templateUrl: './course-basket.component.html',
  styleUrls: ['./course-basket.component.css']
})
export class CourseBasketComponent implements OnInit, OnDestroy {
  basket: AddCourseModel[] = [];
  // Local subscription object to manipulate subscription and !PREVENT MEMORY LEAKS!
  // This is a local service property that is set equal to the service that is injected below
  private courseSubscription: Subscription;
  courseService: CourseService;
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }
  /** Subscribes to the course array from addCourse.
   *
   * @returns void
   */
  ngOnInit() {
    this.courseSubscription = this.courseService.getBasketUpdateListener().subscribe((courses: AddCourseModel[]) => {
      this.basket = courses;
    });
  }
  /** Unsubscribe from the course array to prevent memory leaks when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
  }
}
