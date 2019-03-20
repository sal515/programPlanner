import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component imports
import {HeaderComponent} from './header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';

const appRoutes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [{path: '', component: LoginFormComponent}]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    LoginFormComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
