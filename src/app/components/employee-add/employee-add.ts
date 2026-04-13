import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

// Component for adding a new employee
@Component({
  selector: 'app-employee-add',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './employee-add.html'
})

export class AddEmployee {
  empForm: FormGroup;
  loading = false;
  uploadLoading = false;
  errorMsg = '';
  photoUrl = '';

  // Initialize form and inject services
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.empForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
    });
  }

  // Getter for easy access to form controls
  get f() { return this.empForm.controls; }

  // Handle file input change for photo upload
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadLoading = true;
    this.employeeService.uploadPhoto(file).subscribe({
      next: (res) => { this.photoUrl = res.url; this.uploadLoading = false; },
      error: () => { this.errorMsg = 'Photo upload failed.'; this.uploadLoading = false; },
    });
  }

  // Handle form submission to add a new employee
  onSubmit(): void {
    if (this.empForm.invalid) { this.empForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';

    const payload = { ...this.empForm.value, employee_photo: this.photoUrl || null };
    this.employeeService.addEmployee(payload).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMsg = err.graphQLErrors?.[0]?.message || err.message;
        this.loading = false;
      },
    });
  }
}
