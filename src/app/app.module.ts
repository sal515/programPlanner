import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import the following in service
// import {HttpClient} from '@angular/common/http';

// angular forms input and output 2-way binding module
import {FormsModule} from '@angular/forms';
// angular forms input and output 2-way binding module

// angular imports
import {
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatChipsModule
} from '@angular/material';
// angular imports

// Service
// The course service is a service created to handle data separately from components; The module is added in the provider section below
// Note: Doesn't need to be imported if the decorator is used
// import {CourseService} from './Courses/course.service';
// Service


// imports of my custom components
import {HeaderViewComponent} from './header-view/header-view.component';
import {HomeViewContainerComponent} from './home-view-container/home-view-container.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {ClassesService} from './classes-service/classes.service';
import {AddCourseViewComponent} from './add-course-view/add-course-view.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AlreadyLoggedInGuard, AuthenticationGuard} from "./authentication/authentication.guard";
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { HomeComponent } from './home/home.component';

// imports of my custom components

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    LoginFormComponent,
    HomeComponent,
    HeaderViewComponent,
    HomeViewContainerComponent,
    AddCourseViewComponent,
    CalendarViewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
