import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Onboarding } from './components/onboarding/onboarding';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'onboarding',
    component: Onboarding,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
];
