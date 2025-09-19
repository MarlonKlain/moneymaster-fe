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

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http.get<BudgetCategory[]>(`${this.apiUrl}/budget-category`);
  }

  //todo improve the return type
  updateBudgetCategoriesList(
    budgetCategories: BudgetCategory[]
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/budget-category/update`,
      budgetCategories
    );
  }

  deleteBudgetCategory(budgetCategory: BudgetCategory): Observable<any | null> {
    return this.http.post<any>(
      `${this.apiUrl}/budget-category/delete`,
      budgetCategory
    );
  }

  getTotalFixedCost(budgetCategory: BudgetCategory): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/budget-category/${budgetCategory.budgetCategoryId}`
    );
  }
}
