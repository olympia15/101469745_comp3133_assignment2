import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../../graphql/mutations';
import { AuthService } from '../../services/auth.service';

// Login component
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  // Initialize form and check if user is already logged in
  constructor(private fb: FormBuilder, private apollo: Apollo, private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/employees']);
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Getter for easy access to form controls in the template
  get f() { return this.loginForm.controls; }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';

    this.apollo.query<{ login: { message: string; user: any } }>({
      query: LOGIN_QUERY,
      variables: this.loginForm.value,
      fetchPolicy: 'network-only',
    }).subscribe({
      next: (res) => {
        this.auth.setUser(res.data.login.user);
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMsg = err.graphQLErrors?.[0]?.message || 'Login failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
