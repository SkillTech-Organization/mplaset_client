import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_auth/auth.service';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { FormUserCreds } from './form-user-creds';

@Component({
  selector: 'af-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  private static AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY = 'authToken';

  public formUser: FormUserCreds;
  public hidePassword: boolean = true;
  public submitButtonDisabled: Boolean = true;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { warning: true, error: false },
      positionClass: 'toast-bottom-center'
    });

  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.formUser = new FormUserCreds();
  }

  public ngOnInit(): void {
    // TODO remove when not testing anymore
    // localStorage.setItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY,
    //   'P6w/g1SU1wb/F6cJBwYDF9Ct/9Zw0hGbBosLMnTAq0ZYImQBKW7QsRJ5brMqiYBr');
    let authToken = localStorage.getItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY);

    if (authToken) {
      console.log('AuthToken found. Logging in with token...');
      this.authService.loginWithToken(authToken).subscribe((data) => {
          if (data.IsSuccess) {
            this.submitButtonDisabled = true;
            localStorage.removeItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY);
            this.router.navigateByUrl('/map');
          } else {
            let toast: Toast = {
              type: 'error',
              title: 'Hiba!',
              body: 'Hibás vagy lejárt token.',
              showCloseButton: false
            };
            this.toasterService.pop(toast);
            this.submitButtonDisabled = false;
            localStorage.removeItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY);
          }
        },
        (error) => {
          let errorMessage = '';
          if (error.indexOf('401') > -1) {
            errorMessage = 'Hibás vagy lejárt token.';
          } else {
            errorMessage = 'Ismeretlen hiba történt.';
          }
          this.errorMessage = <any> error;
          let toast: Toast = {
            type: 'error',
            title: 'Hiba!',
            body: errorMessage,
            showCloseButton: false
          };
          this.toasterService.pop(toast);
          this.submitButtonDisabled = false;
          localStorage.removeItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY);
        });
    } else {
      localStorage.removeItem(LoginComponent.AUTH_TOKEN_CLIENT_LOCAL_STORAGE_KEY);
      this.submitButtonDisabled = false;
    }
  }

  public login() {
    if ((!this.formUser.username || !this.formUser.password ) ||
      (this.formUser.username === '') || (this.formUser.password === '')) {
      let toast: Toast = {
        type: 'warning',
        body: 'Felhasználónév és jelszó megadása kötelező!',
        showCloseButton: false
      };
      this.toasterService.pop(toast);
      return;
    }
    let toast: Toast = {
      type: 'info',
      body: 'Bejelentkezés folyamatban...',
      showCloseButton: false
    };
    this.toasterService.popAsync(toast);
    this.submitButtonDisabled = true;

    this.authService.login(this.formUser.username, this.formUser.password)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.submitButtonDisabled = true;
            this.router.navigateByUrl('/map');
          } else {
            let toast: Toast = {
              type: 'error',
              title: 'Hiba!',
              body: 'Hibás felhasználónév / jelszó.',
              showCloseButton: false
            };
            this.toasterService.pop(toast);
            this.submitButtonDisabled = false;
          }
        },
        (error) => {
          let errorMessage = '';
          if (error.indexOf('401') > -1) {
            errorMessage = 'Hibás felhasználónév vagy jelszó.';
          } else {
            errorMessage = 'Ismeretlen hiba történt.';
          }
          this.errorMessage = <any> error;
          let toast: Toast = {
            type: 'error',
            title: 'Hiba!',
            body: errorMessage,
            showCloseButton: false
          };
          this.toasterService.pop(toast);
          this.submitButtonDisabled = false;
        });
  }
}
