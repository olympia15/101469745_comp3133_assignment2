import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

// Component for editing employee details
@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './employee-edit.html'
})

export class EmployeeEdit implements OnInit {
  empForm!: FormGroup;
  loading = false;
  fetchLoading = false;
  uploadLoading = false;
  errorMsg = '';
  photoUrl = '';
  employeeId = '';

  // Inject necessary services
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // On component initialization, fetch employee details and populate the form
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchLoading = true;
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (emp) => {
        this.photoUrl = emp.employee_photo || '';
        // Format date to yyyy-MM-dd for the date input
        const doj = emp.date_of_joining
          ? new Date(emp.date_of_joining).toISOString().substring(0, 10)
          : '';
        this.empForm = this.fb.group({
          first_name: [emp.first_name, Validators.required],
          last_name: [emp.last_name, Validators.required],
          email: [emp.email, [Validators.required, Validators.email]],
          gender: [emp.gender || ''],
          designation: [emp.position, Validators.required],
          department: [emp.department, Validators.required],
          salary: [emp.salary, [Validators.required, Validators.min(1000)]],
          date_of_joining: [doj, Validators.required],
        });
        this.fetchLoading = false;
      },
      error: (err) => {
        this.errorMsg = err.message;
        this.fetchLoading = false;
      },
    });
  }

  // Getter for easy access to form controls in the template
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

  // Handle form submission to update employee details
  onSubmit(): void {
    if (this.empForm.invalid) { this.empForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';

    const payload = { ...this.empForm.value, employee_photo: this.photoUrl || null };
    this.employeeService.updateEmployee(this.employeeId, payload).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMsg = err.graphQLErrors?.[0]?.message || err.message;
        this.loading = false;
      },
    });
  }
}
