import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(
    page: number,
    limit: number,
    search?: string,
    department?: string,
    status?: string,
    designation?: string,
  ): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (department) {
      params = params.set('department', department);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (designation) {
      params = params.set('designation', designation);
    }

    return this.http.get(this.baseUrl, { params });
  }

  addEmployee(emp: Employee) {
    return this.http.post<Employee>(this.baseUrl, emp);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, emp: Employee) {
    return this.http.put(`${this.baseUrl}/${id}`, emp);
  }
}
