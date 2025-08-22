import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  readonly http = inject(HttpClient);

  createBudget(budget: number): Observable<budget> {
    return this.http
      .post<budget>('http://localhost:8080/api/user/budget', budget)
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }
}
