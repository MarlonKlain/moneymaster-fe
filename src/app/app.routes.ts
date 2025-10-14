import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { Onboarding } from './components/onboarding/onboarding';
import { authGuard } from './guards/auth/auth-guard';
import { RegisterComponent } from './components/auth/register/register';
import { WelcomeComponent } from './components/auth/welcome/welcome';
import { OnboardingBugdetComponent } from './components/onboarding/bugdet/bugdet';
import { onboardingGuard } from './guards/onboarding/onboarding-guard';
import { OnboardingFixedCostComponent } from './components/onboarding/fixed-cost/fixed-cost';
import { BudgetCategoryComponent } from './components/dashboard/budget-category/budget-category';
import { OnboardingBudgetCategoryComponent } from './components/onboarding/budget-category/budget-category';
import { UserComponent } from './components/userprofile/user';
import { monthlyIncomeGuard } from './guards/monthly-income/monthly-income-guard';

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
    component: OnboardingBugdetComponent,
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
    component: OnboardingBudgetCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fixed-cost',
    component: OnboardingFixedCostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'budget-category/edit/:budgetCategoryId',
    component: BudgetCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'budget-category/create',
    component: BudgetCategoryComponent,
    canActivate: [authGuard, monthlyIncomeGuard],
  },
  {
    path: 'user/profile',
    component: UserComponent,
    canActivate: [authGuard],
  },
];
