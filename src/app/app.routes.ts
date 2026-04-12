import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    
    {
        // signup route for user registration
        path: 'signup',
        loadComponent: () => import('./components/signup/signup').then((m) => m.SignupComponent),
    }
];
