// external imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from './app-routing.module';

// angular material imports
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
  MatChipsModule,
  MatDialogModule
} from '@angular/material';

// custom component imports
import { HeaderViewComponent } from './home-view-container/header-view/header-view.component';
import { HomeViewContainerComponent } from './home-view-container/home-view-container.component';
import { CalendarViewComponent } from './home-view-container/calendar-view/calendar-view.component';
import { ClassesService } from './classes-service/classes.service';
import { AddCourseComponent } from './home-view-container/sidebar-view/add-course/add-course.component';
import { CourseBasketComponent } from './home-view-container/sidebar-view/course-basket/course-basket.component';
import { LoginFormComponent } from './login-view/login-form.component';
import { SidebarViewComponent } from './home-view-container/sidebar-view/sidebar-view.component';
import { CourseHistoryComponent, CourseHistoryDialogComponent } from './home-view-container/course-history/course-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderViewComponent,
    HomeViewContainerComponent,
    AddCourseComponent,
    CourseBasketComponent,
    CalendarViewComponent,
    SidebarViewComponent,
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
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    RouterModule
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
