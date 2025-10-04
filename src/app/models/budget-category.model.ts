import { FixedCosts } from './fixed-costs.model';

export interface BudgetCategory {
  budgetCategoryId: string;
  percentage: number;
  total: number;
  name: string;
  imageUrl: string;
  totalFixedCost: number;
  flexibleSpending: number;
  fixedCosts: FixedCosts[] | null;
}
