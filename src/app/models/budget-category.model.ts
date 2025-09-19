import { FixedCosts } from './fixed-costs.model';

export interface BudgetCategory {
  budgetCategoryId: string;
  percentage: number;
  name: string;
  imageUrl: string;
  totalFixedCost: number;
  fixedCosts: FixedCosts[];
}
