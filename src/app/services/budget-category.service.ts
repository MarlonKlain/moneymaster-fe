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
  private readonly apiUrl = environment.apiUrl + '/budget-category';

  //get a list of budget categories
  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http.get<BudgetCategory[]>(`${this.apiUrl}`);
  }

  //todo improve the return type
  updateBudgetCategoriesList(
    budgetCategories: BudgetCategory[]
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/update`, budgetCategories);
  }

  updateBudgetCategory(
    budgetCategory: BudgetCategory
  ): Observable<BudgetCategory> {
    return this.http.patch<BudgetCategory>(
      `${this.apiUrl}/${budgetCategory.budgetCategoryId}`,
      budgetCategory
    );
  }

  deleteBudgetCategory(budgetCategory: BudgetCategory): Observable<any | null> {
    return this.http.post<any>(`${this.apiUrl}/delete`, budgetCategory);
  }

  //get a single one budget category
  getBudgetCategory(budgetCategoryId: string): Observable<BudgetCategory> {
    return this.http.get<BudgetCategory>(`${this.apiUrl}/${budgetCategoryId}`);
  }

  createBudgetCategory(
    budgetCategory: BudgetCategory
  ): Observable<BudgetCategory> {
    return this.http.post<BudgetCategory>(
      `${this.apiUrl}/create`,
      budgetCategory
    );
  }

  userExceededMonthlyIncome(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/monthly-income`);
  }
}
