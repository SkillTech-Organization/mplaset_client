// Core imports
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
// 3rd party imports

// RxJS imports
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
// Own imports
import { User } from './user';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class AuthService {
  public _user: User;
  public autoLogoutRemainingTime: number;
  public showAutoLogoutTimeoutDialog: boolean = false;

  private showAutoLogoutTimeoutDialogTriggerTimeSecs: number = 30;
  private autoLogoutTimeoutMinutes: number;
  private autoLogoutInterval: any;

  // URLs to C# controller
  private loginUrl = 'Auth/Login';
  private tokenLoginUrl = 'Auth/TokenLogin';
  private logoutUrl = 'Auth/Logout';

  constructor(private http: Http,
              private router: Router) {
    this._user = new User();
    this._user.isAuthenticated = false;
  }

  // Returns the current user whether it's logged in or not
  public getUser(): User {
    return this._user;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// [ LOGIN ] ///////////////////////////////////////
  // Tries to log in the user with the given credentials
  // TODO refactor to use same mapping
  // TODO Ügyfél módban - mikor a linkkel lépünk be - az útvonalak ne legyenek megjelenítve.
  public login(userName: string, password: string):
  Observable<any> {
    let body = JSON.stringify({
      userName,
      password
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(this.loginUrl, body, options)
      .map((res) => res.json())
      .map((res) => {
        if (res.IsSuccess) {
          // create new user object
          this._user.id = res.Id;
          this._user.name = res.Name;
          this._user.roles = res.Roles;
          this._user.isAuthenticated = res.IsSuccess;
          this._user.roles.forEach((role) => {
            console.log('role: ', role);
            if (role === 'ADMIN') {
              this._user.canUseRestartButton = true;
              this._user.canExportUserTrackingCSV = true;
              this._user.canSetManualTPCompletion = true;
            }
          });
          // start autoLogoutTimer countdown
          this.autoLogoutTimeoutMinutes = res.SessionTimeoutMinutes;
          this.autoLogoutRemainingTime = (this.autoLogoutTimeoutMinutes * 60 * 1000 - 5000);
          this.autoLogoutInterval = setInterval(() => this.autoLogoutCountdown(), 1000);
        }
        return res || {};
      })
      .catch(this.handleError);
  }

  public loginWithToken(authToken: string):
  Observable<any> {
    let body = JSON.stringify({
      token: authToken
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(this.tokenLoginUrl, body, options)
      .map((res) => res.json())
      .map((res) => {
        if (res.IsSuccess) {
          // create new user object
          this._user.id = res.Id;
          this._user.name = res.Name;
          this._user.roles = res.Roles;
          this._user.isAuthenticated = res.IsSuccess;
          this._user.roles.forEach((role) => {
            console.log('role: ', role);
            if (role === 'ADMIN') {
              this._user.canUseRestartButton = true;
              this._user.canExportUserTrackingCSV = true;
            }
          });
          // start autoLogoutTimer countdown
          this.autoLogoutTimeoutMinutes = res.SessionTimeoutMinutes;
          this.autoLogoutRemainingTime = (this.autoLogoutTimeoutMinutes * 60 * 1000);
          this.autoLogoutInterval = setInterval(() => this.autoLogoutCountdown(), 1000);
        }
        return res || {};
      })
      .catch(this.handleError);
  }
  ////////////////////////////////// [ LOGOUT ] //////////////////////////////////////
  public logout(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    let body = JSON.stringify({});
    return this.http.post(this.logoutUrl, body, options)
      .catch(this.handleError)
      .map((x) => {
        this._user.isAuthenticated = false;
      });
  }

  public eagerLogout(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    let body = JSON.stringify({});
    this._user.isAuthenticated = false;
    return this.http.post(this.logoutUrl, body, options)
      .catch(this.handleError)
      .map((x) => {
        console.log('eagerLogout successful.');
      });
  }

  public logoutWithNavigation() {
    this.logout().subscribe((x) => {
      this.router.navigateByUrl('/login');
    });
  }

  public logoutWithPreNavigation() {
    console.log('Redirecting to login...');
    this.router.navigateByUrl('/login');
    this.eagerLogout().subscribe((x) => {
      console.log('Logout successful.');
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////

  public resetAutoLogoutCountdown() {
    this.autoLogoutRemainingTime = this.autoLogoutTimeoutMinutes * 60 * 1000;
    this.showAutoLogoutTimeoutDialog = false;
  }

  private autoLogoutCountdown() {
    this.autoLogoutRemainingTime = this.autoLogoutRemainingTime - 1000;
    if (this.autoLogoutRemainingTime <= 0) {
      this.logout().subscribe((x) => {
        clearInterval(this.autoLogoutInterval);
        this.router.navigate(['/login']);
      });
    } else {
      if (!this.showAutoLogoutTimeoutDialog) {
        if (this.autoLogoutRemainingTime - this.showAutoLogoutTimeoutDialogTriggerTimeSecs * 1000 <= 0) {
          this.showAutoLogoutTimeoutDialog = true;
        }
      }

    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
