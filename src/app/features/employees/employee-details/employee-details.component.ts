import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { TableToolbarComponent } from '../../../shared/components/table-toolbar/table-toolbar.component';
import { DataCardComponent } from '../../../shared/components/data-card/data-card.component';
import { Employee, TableFilterConfig } from '../../../core/types/types';
import {
  EMPLOYEE_DISPLAYED_COLUMNS,
  EMPLOYEE_TABLE_ACTIONS,
  FILTER_CONFIGS,
} from '../../../shared/constants/constants';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../../core/services/employee.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    DataTableComponent,
    MatPaginatorModule,
    MatIconModule,
    MatTooltip,
    MatChipsModule,
    TableToolbarComponent,
    DataCardComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  employees = signal<Employee[]>([]);
  totalEmployees = signal(0);
  loading = signal(false);

  pageSize = signal(5);
  currentPage = signal(0);
  searchTerm = signal('');
  activeFilters = signal<any>({});

  displayedColumns = EMPLOYEE_DISPLAYED_COLUMNS;
  tableActions = EMPLOYEE_TABLE_ACTIONS;
  filtersConfig = signal<TableFilterConfig[]>(FILTER_CONFIGS);
  isTableView = signal(true);
  dataSource = new MatTableDataSource<Employee>([]);

  startIndex = computed(() => this.currentPage() * this.pageSize() + 1);
  endIndex = computed(() =>
    Math.min((this.currentPage() + 1) * this.pageSize(), this.totalEmployees()),
  );

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading.set(true);

    const page = this.currentPage() + 1;
    const limit = this.pageSize();
    const search = this.searchTerm();
    const { department, status, designation } = this.activeFilters();

    this.employeeService
      .getEmployees(page, limit, search, department, status, designation)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.employees.set(res.data);
          this.totalEmployees.set(res.total);
          this.dataSource = new MatTableDataSource(res.data);
        },
        error: () => console.error('Failed to fetch employees'),
      });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(0);
    this.loadEmployees();
  }

  onApplyFilters(filters: any) {
    this.activeFilters.set(filters);
    this.currentPage.set(0);
    this.loadEmployees();
  }

  onResetFilters() {
    this.searchTerm.set('');
    this.activeFilters.set({});
    this.currentPage.set(0);
    this.loadEmployees();
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex);
    this.loadEmployees();
  }

  onToggle() {
    const isNowCardView = this.isTableView();

    if (isNowCardView) {
      this.pageSize.set(8);
    } else {
      this.pageSize.set(5);
    }

    this.isTableView.set(!isNowCardView);
    this.currentPage.set(0);
    this.loadEmployees();
  }

  handleTableAction(event: any) {
    switch (event.action) {
      case 'Edit':
        this.handleEditDialog(event.data);
        break;
      case 'Delete':
        this.handleDelete(event.data);
        break;
    }
  }

  handleDelete(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      minWidth: '40vw',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Delete Confirmation',
        message: `Are you sure want to delete employee ${employee.name} (${employee.designation})`,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isConfirmed) {
        this.deleteEmployee(employee);
      }
    });
  }

  handleEditDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: 'auto',
      minWidth: '80vw',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Edit Employee',
        editRowData: employee,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employeeService.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe({
      next: (response) => {
        this.snackBar.open('Employee updated successfully!', 'Close', { duration: 6000 });
        this.loadEmployees();
      },
      error: (err) => {
        this.snackBar.open('Failed to update employee', 'Close', { duration: 6000 });
      },
    });
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: (response) => {
        this.snackBar.open('Employee deleted successfully!', 'Close', { duration: 6000 });
        this.loadEmployees();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete employee', 'Close');
      },
    });
  }
}
