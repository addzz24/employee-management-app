import {
  Component,
  ViewChild,
  AfterViewInit,
  effect,
  inject,
  OnInit,
  input,
  signal,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TableAction, TableActionEvent } from '../../../core/types/types';
import { TitleCaseSplitPipe } from "../../../core/pipes/title-case-split.pipe";
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    TitleCaseSplitPipe,
    MatChipsModule
],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T> implements AfterViewInit, OnInit {
  data = input<T[]>([]);
  visibleColumns = input<string[]>([]);
  tableActions = input<TableAction[]>([]);
  enablePagination = input();
  enableSorting = input();
  enableSearch = input();
  enableFilters = input();

  tableActionEmitter = output<TableActionEvent>();

  dataSource = new MatTableDataSource<T>();
  startIndex = signal(0);
  endIndex = signal(0);

  router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngOnInit() {
    this.dataSource.data = this.data();
  }

  ngAfterViewInit() {
    if (this.enablePagination()) {
      this.dataSource.paginator = this.paginator;

      this.updatePageInfo();
      this.paginator.page.subscribe(() => {
        this.updatePageInfo();
      });
    }

    if (this.enableSorting()) {
      this.dataSource.sort = this.sort;
    }
  }

  updatePageInfo() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    const start = pageIndex * pageSize + 1;

    const end = Math.min((pageIndex + 1) * pageSize, this.dataSource.filteredData.length);

    this.startIndex.set(start);
    this.endIndex.set(end);
  }

  addNewRecord() {
    this.router.navigate(['add-employee']);
  }

  emitTableAction(action: string, row: T) {
    this.tableActionEmitter.emit({ action, data: row });
  }
}
