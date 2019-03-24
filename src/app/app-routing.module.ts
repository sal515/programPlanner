import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewContainerComponent} from './home-view-container/home-view-container.component';

const routes: Routes = [
  // the root page routing path
  // example: local path - http://localhost:4200/
  // example: if not local path - http://programplanner.com/
  {path: '', component: HomeViewContainerComponent}

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
