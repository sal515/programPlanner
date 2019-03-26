import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private validateUserURL = "http://localhost:3000/validateLogin";

  constructor(private http: HttpClient, private router: Router){}

  async checkUserProfile(userID: string, userPassword: string ) {
    let credentials = new HttpParams().set("userID", userID).set("userPassword", userPassword);

    await this.http.get(this.validateUserURL, {responseType: 'json', params: credentials})
      .toPromise().then(response =>
      {
        if(response["studentProfile"] != null)
        {
          localStorage.setItem("studentProfile", JSON.stringify(response["studentProfile"]));
        }
      });

    if(this.isLoggedIn())
    {
      this.router.navigate([""]);
    }
    else
    {
      return false
    }

  }

  logout()
  {
    localStorage.removeItem("studentProfile");
    this.router.navigate([""]);
  }

  isLoggedIn(){
    console.log(localStorage.getItem("studentProfile"));
    return localStorage.getItem("studentProfile") != null;
  }
}


