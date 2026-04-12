import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';

// Employee list component
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})

export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  loading = false;
  searchLoading = false;
  errorMsg = '';
  searchPosition = '';
  searchDepartment = '';

  // Inject the EmployeeService to fetch employee data
  constructor(private employeeService: EmployeeService) {}

  // On component initialization, load all employees
  ngOnInit(): void {
    this.loadAll();
  }

  // Load all employees from the server
  loadAll(): void {
    this.loading = true;
    this.errorMsg = '';
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => { this.employees = data; this.loading = false; },
      error: (err) => { this.errorMsg = err.message; this.loading = false; },
    });
  }

  // Search employees based on position and department
  onSearch(): void {
    if (!this.searchPosition && !this.searchDepartment) { this.loadAll(); return; }
    this.searchLoading = true;
    this.errorMsg = '';
    this.employeeService.searchEmployees(
      this.searchPosition || undefined,
      this.searchDepartment || undefined
    ).subscribe({
      next: (data) => { this.employees = data; this.searchLoading = false; },
      error: (err) => { this.errorMsg = err.message; this.searchLoading = false; },
    });
  }

  // Clear search filters and reload all employees
  clearSearch(): void {
    this.searchPosition = '';
    this.searchDepartment = '';
    this.loadAll();
  }

  // Delete an employee by ID
  onDelete(eid: string): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.employeeService.deleteEmployee(eid).subscribe({
      next: () => { this.employees = this.employees.filter((e) => e._id !== eid); },
      error: (err) => { this.errorMsg = err.message; },
    });
  }
}
