import { Component, effect, OnInit, signal, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import {
  DEFAULT_EMPLOYEES,
  EMPLOYEE_DISPLAYED_COLUMNS,
  EMPLOYEE_TABLE_ACTIONS,
  FILTER_CONFIGS,
} from '../../shared/constants/constants';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { TableToolbarComponent } from '../../shared/components/table-toolbar/table-toolbar.component';
import { Employee, TableFilterConfig } from '../../core/types/types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  imports: [
    DataTableComponent,
    MatPaginatorModule,
    MatIconModule,
    MatTooltip,
    MatChipsModule,
    TableToolbarComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  originalEmployees = signal<Employee[]>(DEFAULT_EMPLOYEES);
  employees = signal<Employee[]>(DEFAULT_EMPLOYEES);
  displayedColumns = EMPLOYEE_DISPLAYED_COLUMNS;
  tableActions = EMPLOYEE_TABLE_ACTIONS;
  enablePagination = true;

  //department, status, designation only
  filtersConfig = signal<TableFilterConfig[]>(FILTER_CONFIGS);
  dataSource = new MatTableDataSource(this.employees() || []);

  isTableView = signal<boolean>(true);
  startIndex = signal(0);
  endIndex = signal(0);

  private _paginator!: MatPaginator;

  @ViewChild(MatPaginator)
  set paginator(p: MatPaginator) {
    if (p) {
      this._paginator = p;

      this.dataSource.paginator = p;

      p.firstPage();

      this.updatePageInfo();

      p.page.subscribe(() => {
        this.updatePageInfo();
      });
    }
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.employees();
    });
  }

  ngOnInit(): void {
    this.isTableView.set(true);
    this.dataSource.data = this.employees();
  }

  ngAfterViewInit() {
    this.updatePageInfo();
    this._paginator.page.subscribe(() => {
      this.updatePageInfo();
    });
  }

  handleTableAction(event: any) {
    console.log('Table action event:', event);
  }

  onToggle() {
    const newValue = !this.isTableView();
    this.isTableView.set(newValue);
    if (newValue) {
      setTimeout(() => {
        if (this.paginator) {
          this.paginator.firstPage();
          this.updatePageInfo();
        }
      });
    }
  }
  onSearch(term: string) {
    const search = term.toLowerCase();
    const filtered = this.originalEmployees().filter((emp) =>
      emp.name?.toLowerCase().includes(search),
    );

    this.dataSource.data = filtered;
    this.paginator?.firstPage();
  }

  onApplyFilters(filters: any) {
    console.log('Applying filters:', filters);
    const filtered = this.originalEmployees().filter((emp) => {
      const matchesDepartment = !filters.department || emp.department === filters.department;
      const matchesDesignation = !filters.designation || emp.designation === filters.designation;
      const matchesStatus = !filters.status || emp.status === filters.status;

      return matchesDepartment && matchesDesignation && matchesStatus;
    });

    this.dataSource.data = filtered;
    this.paginator?.firstPage();
  }

  onResetFilters() {
    this.dataSource.data = this.originalEmployees();
  }

  updatePageInfo() {
    if (!this._paginator) return;

    const pageIndex = this._paginator.pageIndex;
    const pageSize = this._paginator.pageSize;

    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, this.employees().length);

    this.startIndex.set(start);
    this.endIndex.set(end);
  }
}
