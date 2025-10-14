import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { map, take } from 'rxjs';
import { AlertService } from '../../services/alerts.service';

export const monthlyIncomeGuard: CanActivateFn = (route, state) => {
  const budgetCategoryService = inject(BudgetCategoryService);
  const alert = inject(AlertService);

  const hasUserExceededMonthlyIncome = budgetCategoryService
    .userExceededMonthlyIncome()
    .pipe(
      take(1),
      map((response) => {
        //if user has destinate 100% of his monthly income, he wont be able to create anothe budgte category
        if (response) {
          return false;
        } else {
          return true;
        }
      })
    );

  if (hasUserExceededMonthlyIncome) {
    alert.showError(
      'You have achieved 100% of you income!',
      'Please, adjust the other budget categories percentage and then try again.'
    );
    return false;
  } else {
    return true;
  }
};
