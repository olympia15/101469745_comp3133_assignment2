import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

// Component to display details of employee
@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './employee-details.html'
})

export class EmployeeDetails implements OnInit {
  employee: Employee | null = null;
  loading = false;
  errorMsg = '';

  // Inject EmployeeService and ActivatedRoute to fetch employee details based on route parameter
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  // Fetch employee details on component initialization
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (emp) => { this.employee = emp; this.loading = false; },
      error: (err) => { this.errorMsg = err.message; this.loading = false; },
    });
  }
}
