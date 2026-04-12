import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Interface representing the authenticated user
export interface AuthUser {
  _id: string;
  username: string;
  email: string;
}

// AuthService to manage user authentication state and session persistence
@Injectable({ providedIn: 'root' })

export class AuthService {

  // Current authenticated user, initialized from sessionStorage if available  
  private currentUser: AuthUser | null = null;

  constructor(private router: Router) {
    
    // Restore session from sessionStorage on page reload
    const stored = sessionStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  // Set the authenticated user and persist it in sessionStorage
  setUser(user: AuthUser): void {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Get the current authenticated user
  getUser(): AuthUser | null {
    return this.currentUser;
  }

  // Check if a user is currently authenticated
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Logout the user by clearing the current user and sessionStorage, then navigate to login page
  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}