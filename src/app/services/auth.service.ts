import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserInformation } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { UserLogin, UserRegistration } from '../models/auth.model';
import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injecting the httpClient dependency
  // private because the dependency wont be access directly by the components, it will be accessed by the methods below
  // readOnly because we wont change anything on HttpClient dependency, we will only read and request.
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private apiUrl = environment.apiUrl + '/user';

  userLogin(userCredentials: UserLogin): Observable<UserInformation> {
    return this.httpClient
      .post<UserInformation>(`${this.apiUrl}/login`, userCredentials)
      .pipe(
        tap((response) => {
          if (response && response.jwtToken) {
            this.saveToken(response.jwtToken);
            console.log(response);
            if (response.onboarding.hasCompletedOnboarding) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/onboarding']);
            }
          }
        })
      );
  }

  userRegister(userCredentials: UserRegistration): Observable<ServerResponse> {
    return this.httpClient
      .post<ServerResponse>(`${this.apiUrl}/register`, userCredentials)
      .pipe(
        tap((response) => {
          if (response) {
            this.router.navigate(['/login']);
          } else {
            throw new Error('ERROR to register');
          }
        })
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
