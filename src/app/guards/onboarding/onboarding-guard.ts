import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetService } from '../../services/budget.service';
import { OnboardingService } from '../../services/onboarding.service';
import { UserService } from '../../services/user.service';
import { map, take } from 'rxjs';

export const onboardingGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getUserOnboardingStatus().pipe(
    take(1),
    map((user) => {
      if (!user.hasCompletedOnboarding) {
        router.navigate(['/onboarding']);
        return false;
      }

      if (!user.hasSetMonthlyIncome) {
        router.navigate(['/budget']);
        return false;
      }

      if (!user.hasSetBudgetCategories) {
        router.navigate(['/budget-category']);
        return false;
      }

      if (!user.hasSetFixedCosts) {
        console.log(user.hasSetFixedCosts);
        router.navigate(['/fixed-cost']);
        return false;
      }

      return true;
    })
  );
};
