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
  MatExpansionModule
} from '@angular/material';
// angular imports

// Service
// The course service is a service created to handle data separately from components; The module is added in the provider section below
// Note: Doesn't need to be imported if the decorator is used
// import {CourseService} from './Courses/course.service';
// Service


// imports of my custom components
import {HeaderComponent} from './header/header.component';
import {CourseCreateComponent} from './Courses/course_create/course_create.component';
import {CourseListComponent} from './Courses/course_list/course_list.component';
import {HomeComponent} from './home/home';
import {CourseCreateListContainerComponent} from './Courses/course_create_list_container';

// imports of my custom components

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseCreateComponent,
    CourseListComponent,
    HomeComponent,
    CourseCreateListContainerComponent
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
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [
    // if the decorator wasn't used in the service class declaration : @Injectable({providedIn: 'root'})
    // CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
