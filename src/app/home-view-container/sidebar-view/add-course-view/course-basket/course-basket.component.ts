import {Component, OnInit, OnDestroy} from '@angular/core';
import {AddCourseModel} from '../../../../models/course.model';
import {Subscription} from 'rxjs';
import {CourseService} from '../add-course.service';

@Component({
  selector: 'app-course-basket-component',
  templateUrl: './course-basket.component.html',
  styleUrls: ['./course-basket.component.css']
})
export class CourseBasketComponent implements OnInit, OnDestroy {
  basket: AddCourseModel[] = [];
  private courseSubscription: Subscription;
  courseService: CourseService;
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }
  ngOnInit() {
    this.courseSubscription = this.courseService.getCourseUpdateListener().subscribe((courses: AddCourseModel[]) => {
      this.basket = courses;
    });
  }
  ngOnDestroy() {
    // !PREVENT MEMORY LEAKS! by unsubscribe when the component is destroyed.
    this.courseSubscription.unsubscribe();
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
  /** Empties the basket.
   *
   * @returns void
   */
}
