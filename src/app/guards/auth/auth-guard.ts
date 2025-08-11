import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const storedToken: string | null = localStorage.getItem('jwtToken');

  if (!storedToken) {
    console.log('SEM TOKEN');
    router.navigate(['/login']);
    return false;
  } else {
    console.log('COM TOKEN');
    return true;
  }
};
