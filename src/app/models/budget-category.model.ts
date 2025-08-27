import { FixedCosts } from './fixed-costs.model';

export interface BudgetCategory {
  percentage: number;
  name: string;
  imageUrl: string;
  fixedCosts: FixedCosts[];
}
