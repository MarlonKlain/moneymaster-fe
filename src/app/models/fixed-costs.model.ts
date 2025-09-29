import { BudgetCategory } from './budget-category.model';

export interface FixedCosts {
  fixedCostId: string;
  amount: number;
  description: string;
  budgetCategory: BudgetCategory;
}
