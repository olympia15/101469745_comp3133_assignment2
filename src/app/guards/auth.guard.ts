import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Route guard to protect routes that require authentication
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // If user is logged in, allow access to the route
  if (auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
