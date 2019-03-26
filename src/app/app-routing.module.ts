import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewContainerComponent} from './home-view-container/home-view-container.component';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {LoginFormComponent} from "./authentication/login-form/login-form.component";
import {HomeComponent} from "./home/home.component";
import {AuthenticationGuard} from "./authentication/authentication.guard";

const routes: Routes = [
  // the root page routing path
  // example: local path - http://localhost:4200/
  // example: if not local path - http://programplanner.com/
  {
    path: 'login',
    component: AuthenticationComponent,
    //canActivate: [AlreadyLoggedInGuard],
    children: [{path: '', component: LoginFormComponent}]
  },
  {
    path: '', component: HomeComponent,
    canActivate: [AuthenticationGuard]
  }

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
