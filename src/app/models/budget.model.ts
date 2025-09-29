import { BudgetCategory } from './budget-category.model';

export interface Budget {
  budgetCategoryId: string | null;
  monthlyIncome: number;
  budgetCategories: BudgetCategory[] | null;
}
