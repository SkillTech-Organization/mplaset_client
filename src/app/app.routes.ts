import { Routes } from '@angular/router';
import { MapComponent } from './map';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth-guard.service';
import { UserManagementComponent } from './user-management/user-management.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    canActivate: [AuthGuard],
    component: MapComponent
  },
  {
    path: 'user-management',
    canActivate: [AuthGuard],
    component: UserManagementComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
