import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})

/**
 * This is the guard for the login page.
 * If a studentProfile is saved in the cookies, redirect the user to the home page.
 */
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.authService.isLoggedIn())
    {
      this.router.navigate([""]);
      return false
    }
    else
    {
      return true
    }
  }

}
