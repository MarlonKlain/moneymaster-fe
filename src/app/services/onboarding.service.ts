import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/onboarding';

  completeOnboarding(): Observable<ServerResponse> {
    return this.HttpClient.patch<ServerResponse>(`${this.apiUrl}/complete`, {});
  }
}
