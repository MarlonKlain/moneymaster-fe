import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injecting the httpClient dependency
  // private because the dependency wont be access directly by the components, it will be accessed by the methods below
  // readOnly because we wont change anything on HttpClient dependency, we will only read and request.
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getUsers(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      `http://localhost:8080/api/user/${userId}`
    );
  }

  userLogin(
    userCredentials: Pick<User, 'username' | 'password'>
  ): Observable<Partial<User>> {
    return this.httpClient
      .post<Partial<User>>(
        'http://localhost:8080/api/user/login',
        userCredentials
      )
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.saveToken(response.token);
            console.log(response);
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
      .post<Partial<User>>(
        'http://localhost:8080/api/user/register',
        userCredentials
      )
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
