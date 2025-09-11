import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FixedCosts } from '../models/fixed-costs.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FixedCostService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  saveFixedCosts(fixedCosts: FixedCosts[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/fixed-cost`, fixedCosts);
  }

  deleteFixedCost(fixedCostId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/fixed-cost/delete`, fixedCostId);
  }
}
