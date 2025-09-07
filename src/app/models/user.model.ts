export interface User {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;
  hasCompletedOnboarding: boolean | null;
  hasSetMonthlyIncome: boolean | null;
  hasSetBudgetCategories: boolean | null;
  hasSetFixedCosts: boolean | null;
  token: string | null;
}
