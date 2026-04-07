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
    setTimeout(() => {
      this.employees.update((employees) => [
        ...employees,
        {
          id: 1,
          name: 'John Smith',
          position: 'Software Engineer',
          designation: 'Backend Developer',
          dob: '1999-01-01',
          address: [
            {
              type: 'Home',
              line1: '123 Main St',
              line2: 'Apt 4B',
              city: 'New York',
              pincode: 10001,
              state: 'NY',
            },
          ],
          education: 'B.Sc. Computer Science',
          joiningDate: '2023-06-15',
          experience: 5,
          employmentType: 'Full-time',
          status: 'Inactive',
          salary: 2000,
          bonus: 1000,
          currency: 'USD',
        },
      ]);
    }, 2000);
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

  onResetFilters() {
    // Reset filters logic here
    console.log('Filters reset');
  }

  onApplyFilters(filters: any) {
    // Apply filters logic here
    console.log('Applying filters:', filters);
  }

  onFiltersChange(filters: any) {
    // Handle filter changes if needed
    console.log('Filters changed:', filters);
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
