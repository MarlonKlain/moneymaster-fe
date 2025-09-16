import { BudgetCategory } from './budget-category.model';

export interface Budget {
  monthlyIncome: number;
  budgetCategories: BudgetCategory[] | null;
}
