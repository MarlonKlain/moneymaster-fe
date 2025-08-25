import { CanActivateFn, Router } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const budgetGuard: CanActivateFn = (route, state) => {
  const budgetService = inject(BudgetService);
  const router = inject(Router);

  return budgetService.hasBudget().pipe(
    take(1),
    map((hasBudget) => {
      if (hasBudget) {
        console.log('BUDGET: ', hasBudget);
        return true;
      } else {
        console.log('User has no budget, redirecting to /onboarding/budget');
        router.navigate(['/budget']);
        return false;
      }
    })
  );
};
