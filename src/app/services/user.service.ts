import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getUserInformation(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`);
  }

  getTotalFixedCost(): Observable<number> {
    return this.getUserInformation().pipe(
      map((user) => {
        if (!user.budget?.budgetCategories) {
          return 0;
        }

        //categoryTotal: the total of all the fixed costs in ALL categories
        return user.budget.budgetCategories.reduce(
          (categoryTotal, budgetCategory) => {
            //categoryTotal: the total of all the fixed costs in one category
            const sumOfCostsInCategory = budgetCategory.fixedCosts.reduce(
              (totalFixedCost, fixedCost) => {
                return totalFixedCost + fixedCost.amount;
              },
              0
            );
            return categoryTotal + sumOfCostsInCategory;
          },
          0
        );
      })
    );
  }
}
