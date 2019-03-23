import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course_create.component.html',
  styleUrls: ['./course_create.component.css']
})
export class CourseCreateComponent {
  // Static Text for the HTML file, Using One way binding
  courseCodeText = 'CourseModel Code';
  courseTypeText = 'CourseModel Type';

  // This is a local object of CourseService class found in course.service.ts file
  courseService: CourseService;

  // Dependency injection from the service to this component
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  onSaveCourse(form: NgForm): number {
    if (form.invalid) {
      return 0;
    }
    // The service method addCourse is called to save the course
    // The service creates the an object and stores it in the shared array of course objects
    this.courseService.addCourse(form.value.courseTypeForm, form.value.courseCodeNumber);
    form.resetForm();
    return 1;
  }
}
