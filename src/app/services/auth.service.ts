import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injecting the httpClient dependency
  // private because the dependency wont be access directly by the components, it will be accessed by the methods below
  // readOnly because we wont change anything on HttpClient dependency, we will only read and request.
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl;

  userLogin(
    userCredentials: Pick<User, 'username' | 'password'>
  ): Observable<Partial<User>> {
    console.log(this.apiUrl);
    return this.httpClient
      .post<Partial<User>>(`${this.apiUrl}/login`, userCredentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            console.log('TOKEN:: ', response.token);
            this.saveToken(response.token);
            if (response.hasCompletedOnboarding) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/onboarding']);
            }
          }
        })
      );
  }

  userRegister(
    userCredentials: Omit<User, 'hasCompletedOnboarding' | 'token'>
  ): Observable<Partial<User>> {
    return this.httpClient
      .post<Partial<User>>(`${this.apiUrl}/register`, userCredentials)
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
