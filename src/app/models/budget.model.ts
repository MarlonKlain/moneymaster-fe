import { BudgetCategory } from './budget-category.model';

export interface Budget {
  monthlyIncome: number | null | undefined;
  budgetCategories: BudgetCategory[] | null;
}
