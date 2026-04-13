import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    GET_ALL_EMPLOYEES, GET_EMPLOYEE_BY_ID, SEARCH_EMPLOYEES,
    ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE,
} from '../graphql/mutations';
import { environment } from '../../environments/environment';

// Employee interface and service for managing employee data
export interface Employee {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender?: string;
    designation: string;
    salary: number;
    date_of_joining: string;
    department: string;
    employee_photo?: string;
}

// Service to interact with GraphQL API for employee management
@Injectable({ providedIn: 'root' })

export class EmployeeService {
    constructor(private apollo: Apollo, private http: HttpClient) {}

    // Fetch all employees from the server
    getAllEmployees(): Observable<Employee[]> {
        return this.apollo
          .watchQuery<{ getAllEmployees: Employee[] }>({ query: GET_ALL_EMPLOYEES, fetchPolicy: 'network-only' })
          .valueChanges.pipe(map((r) => r.data.getAllEmployees));
    }

    // Fetch a single employee by ID
    getEmployeeById(eid: string): Observable<Employee> {
        return this.apollo
          .watchQuery<{ searchEmployeeById: Employee }>({
            query: GET_EMPLOYEE_BY_ID,
            variables: { eid },
            fetchPolicy: 'network-only',
          })
          .valueChanges.pipe(map((r) => r.data.searchEmployeeById));
    }

    // Search employees based on designation and department
    searchEmployees(designation?: string, department?: string): Observable<Employee[]> {
        return this.apollo
          .watchQuery<{ searchEmployeeByDesignationOrDepartment: Employee[] }>({
            query: SEARCH_EMPLOYEES,
            variables: { designation, department },
            fetchPolicy: 'network-only',
          })
          .valueChanges.pipe(map((r) => r.data.searchEmployeeByDesignationOrDepartment));
    }   

    // Add a new employee to the server
    addEmployee(input: Omit<Employee, '_id'>): Observable<Employee> {
        return this.apollo
          .mutate<{ addEmployee: Employee }>({ mutation: ADD_EMPLOYEE, variables: input })
          .pipe(map((r) => r.data!.addEmployee));
    }

    // Update an existing employee's info
    updateEmployee(eid: string, input: Partial<Employee>): Observable<Employee> {
        return this.apollo
          .mutate<{ updateEmployee: Employee }>({ mutation: UPDATE_EMPLOYEE, variables: { eid, ...input } })
          .pipe(map((r) => r.data!.updateEmployee));
    }

    // Delete an employee by ID
    deleteEmployee(eid: string): Observable<string> {
        return this.apollo
          .mutate<{ deleteEmployee: string }>({ mutation: DELETE_EMPLOYEE, variables: { eid } })
          .pipe(map((r) => r.data!.deleteEmployee));
    }

    // Upload employee photo to the server
    uploadPhoto(file: File): Observable<{ url: string }> {
        const formData = new FormData();
        formData.append('photo', file);
        return this.http.post<{ url: string }>(environment.uploadUri, formData);
    }
}
