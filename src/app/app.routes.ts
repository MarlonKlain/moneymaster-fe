import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { Onboarding } from './components/onboarding/onboarding';
import { authGuard } from './guards/auth/auth-guard';
import { RegisterComponent } from './components/auth/register/register';
import { WelcomeComponent } from './components/auth/welcome/welcome';
import { BugdetComponent } from './components/bugdet/bugdet';
import { BudgetCategoryComponent } from './components/budget-category/budget-category';
import { onboardingGuard } from './guards/onboarding/onboarding-guard';
import { FixedCostComponent } from './components/fixed-cost/fixed-cost';

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
    component: DashboardComponent,
    canActivate: [authGuard, onboardingGuard],
  },
  {
    path: 'budget-category',
    component: BudgetCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fixed-cost',
    component: FixedCostComponent,
    canActivate: [authGuard],
  },
];
