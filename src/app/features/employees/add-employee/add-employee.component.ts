import { Component, inject } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatProgressSpinnerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {

  loading = false;
  router = inject(Router)
  snackBar = inject(MatSnackBar)
  employeeService = inject(EmployeeService);


  handleFormSubmit(formValue: any) {
    this.loading = true;

    this.employeeService.addEmployee(formValue)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('Failed to add employee', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
}
