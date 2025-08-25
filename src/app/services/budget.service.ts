import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, map, of } from 'rxjs';
import { budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  readonly http = inject(HttpClient);

  createBudget(userBudget: budget): Observable<budget> {
    return this.http.post<budget>(
      'http://localhost:8080/api/user/budget',
      userBudget
    );
  }

  hasBudget(): Observable<boolean> {
    return this.http.get<budget>('http://localhost:8080/api/user/budget').pipe(
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
