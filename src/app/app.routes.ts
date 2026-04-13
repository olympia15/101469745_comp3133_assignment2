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
    },

    // Employee list route, protected by authGuard
    {
        path: 'employees',
        canActivate: [authGuard],
        loadComponent: () => import('./components/employee-list/employee-list').then((m) => m.EmployeeList),
    },

    // Employee details route, protected by authGuard
    {
        path: 'employees/add',
        canActivate: [authGuard],
        loadComponent: () => import('./components/employee-add/employee-add').then((m) => m.AddEmployee),
    }
];
