import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from "./app-routing.module";
// import the following in service
// import {HttpClient} from '@angular/common/http';


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
import {HeaderViewComponent} from './home-view-container/header-view/header-view.component';
import {HomeViewContainerComponent} from './home-view-container/home-view-container.component';
import {CalendarViewComponent} from './home-view-container/calendar-view/calendar-view.component';
import {ClassesService} from './classes-service/classes.service';
import {AddCourseViewComponent} from './home-view-container/sidebar-view/add-course-view/add-course-view.component';
import { LoginFormComponent } from './login-view/login-form.component';
import { SidebarViewComponent } from './home-view-container/sidebar-view/sidebar-view.component';

// imports of my custom components

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderViewComponent,
    HomeViewContainerComponent,
    AddCourseViewComponent,
    CalendarViewComponent,
    SidebarViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ClassesService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [CourseHistoryComponent, CourseHistoryDialogComponent],
})
export class AppModule {
}
