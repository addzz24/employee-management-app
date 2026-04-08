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
          this.dataSource.data = res.data;
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
    console.log('Table action:', event);
  }

  handleDelete(employeeId: number) {
    // Usually you'd call a delete API here, then reload
    console.log('Delete employee:', employeeId);
  }
}
