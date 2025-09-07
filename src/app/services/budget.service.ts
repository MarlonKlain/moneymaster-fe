import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, map, of } from 'rxjs';
import { Budget } from '../models/budget.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  createBudget(userBudget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/budget`, userBudget);
  }

  hasBudget(): Observable<boolean> {
    return this.http.get<Budget>(`${this.apiUrl}/budget`).pipe(
      map((budgetResponse) => {
        if (budgetResponse !== null) {
          return true;
        } else {
          return false;
        }
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          return of(false);
        }

        console.error(
          'An unexpected error occurred checking for budget:',
          error
        );
        return of(false);
      })
    );
  }
}
