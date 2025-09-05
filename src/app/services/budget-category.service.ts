import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BudgetCategory } from '../models/budget-category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryService {
  private readonly http = inject(HttpClient);

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http.get<BudgetCategory[]>(
      'http://localhost:8080/api/user/budget/budget-category'
    );
  }

  //todo improve the return type
  updateBudgetCategoriesList(
    budgetCategories: BudgetCategory[]
  ): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/user/budget/budget-category/update',
      budgetCategories
    );
  }

  deleteBudgetCategory(budgetCategories: BudgetCategory[]): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/user/budget/budget-category/delete',
      budgetCategories
    );
  }
}
