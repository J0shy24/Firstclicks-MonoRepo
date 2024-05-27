import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const tutorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.auth()?.user!.role === 'TUTOR') {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
