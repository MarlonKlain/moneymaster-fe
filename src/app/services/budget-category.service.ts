import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BudgetCategory } from '../models/budget-category.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  //get a list of budget categories
  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http.get<BudgetCategory[]>(`${this.apiUrl}/budget-category`);
  }

  //todo improve the return type
  updateBudgetCategoriesList(
    budgetCategories: BudgetCategory[]
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/budget-category/update`,
      budgetCategories
    );
  }

  updateBudgetCategory(
    budgetCategory: BudgetCategory
  ): Observable<BudgetCategory> {
    return this.http.patch<BudgetCategory>(
      `${this.apiUrl}/budget-category/${budgetCategory.budgetCategoryId}`,
      budgetCategory
    );
  }

  deleteBudgetCategory(budgetCategory: BudgetCategory): Observable<any | null> {
    return this.http.post<any>(
      `${this.apiUrl}/budget-category/delete`,
      budgetCategory
    );
  }

  //return the total fixed cost of a budget category
  getTotalFixedCost(budgetCategory: BudgetCategory): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/budget-category/${budgetCategory.budgetCategoryId}`
    );
  }

  //get a single one budget category
  getBudgetCategory(budgetCategoryId: string): Observable<BudgetCategory> {
    return this.http.get<BudgetCategory>(
      `${this.apiUrl}/budget-category/${budgetCategoryId}`
    );
  }
}
