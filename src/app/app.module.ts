import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

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
  MatAutocompleteModule, MatDialogModule
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
import {CourseHistoryComponent, CourseHistoryDialogComponent} from './course-history/course-history.component';

// imports of my custom components

@NgModule({
  declarations: [
    AppComponent,
    HeaderViewComponent,
    HomeViewContainerComponent,
    AddCourseViewComponent,
    CalendarViewComponent,
    CourseHistoryComponent,
    CourseHistoryDialogComponent
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
    MatAutocompleteModule
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
