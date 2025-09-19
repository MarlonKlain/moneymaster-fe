import { BudgetCategory } from './budget-category.model';

export interface Dashboard {
  totalIncome: number;
  totalFixedCosts: number;
  flexibleSpending: number;
  budgetCategories: BudgetCategory[];
}
