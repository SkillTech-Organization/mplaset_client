import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    this.authService.resetAutoLogoutCountdown();
    return this.checkLogin(url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.resetAutoLogoutCountdown();
    return this.canActivate(route, state);
  }

  public checkLogin(url: string): boolean {
    if ( this.authService.getUser().isAuthenticated ) {
      this.authService.resetAutoLogoutCountdown();
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.getUser().redirectUrl = url;
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
