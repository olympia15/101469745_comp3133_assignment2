import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGNUP_MUTATION } from '../../graphql/mutations';

// Signup component for user registration
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})

// SignupComponent handles user registration logic and UI
export class Signup {
  signupForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls in the template
  get f() { return this.signupForm.controls; }

  // Handles form submission for user signup
  onSubmit(): void {
    if (this.signupForm.invalid) { this.signupForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    // Execute the signup mutation with form values
    this.apollo.mutate<{ signup: { message: string } }>({
      mutation: SIGNUP_MUTATION,
      variables: this.signupForm.value,
    }).subscribe({
      next: (res) => {
        this.successMsg = res.data?.signup.message + ' Redirecting to login...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMsg = err.graphQLErrors?.[0]?.message || 'Signup failed. Please try again.';
        this.loading = false;
      },
    });
  }
}

