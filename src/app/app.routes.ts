import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    // Default route redirects to login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Protected home route that requires authentication
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then((m) => m.Login),
    },
    
    // Signup route
    {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup').then((m) => m.Signup),
    }
];
