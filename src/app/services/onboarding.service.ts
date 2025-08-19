import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly HttpClient = inject(HttpClient);

  completeOnboarding(): Observable<any> {
    return this.HttpClient.patch(
      'http://localhost:8080/api/user/onboarding',
      {}
    );
  }
}
