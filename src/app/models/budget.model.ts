import { BudgetCategory } from './budget-category.model';

export interface Budget {
  budgetId: string | null;
  monthlyIncome: number;
  budgetCategories: BudgetCategory[] | null;
}
