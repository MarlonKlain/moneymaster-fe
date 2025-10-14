import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const storedToken: string | null = localStorage.getItem('jwtToken');

  if (!storedToken) {
    localStorage.removeItem('jwtToken');
    router.navigate(['/welcome']);
    return false;
  } else {
    return true;
  }
};
