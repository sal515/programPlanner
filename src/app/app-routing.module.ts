import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home';
import {CourseCreateListContainerComponent} from './Courses/course_create_list_container';

const routes: Routes = [
  // the root page routing path
  // example: local path - http://localhost:4200/
  // example: if not local path - http://programplanner.com/
  {path: '', component: HomeComponent},
  {path: 'course_create_list', component: CourseCreateListContainerComponent}

  // The code below is used for having sub directories in the url, might be useful
  // path: 'course_create_list', component: CourseCreateComponent, children: [
  //   {path: 'courseCreate', component: CourseCreateComponent},
  //   {path: 'courseList', component: CourseListComponent}
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
