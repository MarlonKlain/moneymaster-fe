import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Onboarding } from './components/onboarding/onboarding';
import { authGuard } from './guards/auth/auth-guard';
import { RegisterComponent } from './components/auth/register/register';
import { WelcomeComponent } from './components/auth/welcome/welcome';
import { BugdetComponent } from './components/bugdet/bugdet';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'budget',
    component: BugdetComponent,
    canActivate: [authGuard],
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
