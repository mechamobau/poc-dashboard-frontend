import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(public router: Router, public auth: AuthService) { }

  public canActivateChild(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth/signin']);
      return false;
    }

    return true;
  }
}
