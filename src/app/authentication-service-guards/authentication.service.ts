import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * This class provides support for the login.
 */
export class AuthenticationService {
  private validateUserURL = 'http://localhost:3000/validateLogin';
  private hasLoggedOut = false;

  constructor(private http: HttpClient, private router: Router) {}
  // http: HTTP request handler
  // router: Routing request handler

  /**
   * Sends a HTTP GET to the server to fetch the studentProfile associated
   * to the given userID and password.
   * The studentProfile is saved in the cookies if it is not null.
   * @param userID
   * @param userPassword
   */
  async getUserProfile(userID: string, userPassword: string ) {
    const credentials = new HttpParams().set('userID', userID).set('userPassword', userPassword);

    await this.http.get(this.validateUserURL, {responseType: 'json', params: credentials})
      .toPromise().then(response => {
        if (response['studentProfile'] != null) {
          localStorage.setItem('studentProfile', JSON.stringify(response['studentProfile']));
        }
      });
  }

  /**
   * If a studentProfile is returned by the server, the user is sent to the home page.
   * @param userID
   * @param userPassword
   */
  async login(userID: string, userPassword: string) {

    await this.getUserProfile(userID, userPassword);

    if (this.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      return false;
    }
  }

  /**
   * Deletes the studentProfile in the cookies and the user is sent to the login page.
   */
  logout() {
    localStorage.removeItem('studentProfile');
    this.router.navigate(['login']);
  }

  /**
   * Checks if a studentProfile is saved in the cookies.
   */
  isLoggedIn() {
    return localStorage.getItem('studentProfile') != null;
  }
  /**
   * Returns the userID in the local storage.
   */
  getUserId(): string {
    return JSON.parse(localStorage.getItem('studentProfile')).userID;
  }
}


