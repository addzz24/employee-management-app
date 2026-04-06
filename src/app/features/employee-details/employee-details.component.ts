import { Component, OnInit, signal } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import {
  DEFAULT_EMPLOYEES,
  EMPLOYEE_DISPLAYED_COLUMNS,
  EMPLOYEE_TABLE_ACTIONS,
} from '../../shared/constants/constants';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from "@angular/material/tooltip";
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-employee-list',
  imports: [DataTableComponent, MatIconModule, MatTooltip, MatChipsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employees = DEFAULT_EMPLOYEES;
  displayedColumns = EMPLOYEE_DISPLAYED_COLUMNS;
  tableActions = EMPLOYEE_TABLE_ACTIONS;
  enablePagination = true;

  isTableView = signal<boolean>(true);

  ngOnInit(): void {
    this.isTableView.set(true);
  }

  handleTableAction(event: any) {
    console.log('Table action event:', event);
  }

  onToggle() {
    this.isTableView.set(!this.isTableView());
  }
}
