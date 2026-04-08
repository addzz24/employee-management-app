import { Component, inject, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from '../../../core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatProgressSpinnerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  loading = false;

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);

  @ViewChild(EmployeeFormComponent) employeeFormComponent!: EmployeeFormComponent;

  handleFormSubmit(formValue: any) {
    this.loading = true;

    this.employeeService
      .addEmployee(formValue)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('Failed to add employee', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  async confirmDiscard(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Unsaved Changes',
        message: 'You have unsaved changes. Are you sure you want to leave?',
      },
    });

    return dialogRef.afterClosed().toPromise().then((result: any) => {
      return result?.isConfirmed ?? false;
    });
  }
}
