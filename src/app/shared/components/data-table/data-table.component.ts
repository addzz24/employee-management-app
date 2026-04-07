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
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
export class DataTableComponent implements AfterViewInit {

  dataSource = input.required<MatTableDataSource<any>>();
  visibleColumns = input<string[]>([]);
  tableActions = input<TableAction[]>([]);
  enableSorting = input();
  enableSearch = input();
  enableFilters = input();

  tableActionEmitter = output<TableActionEvent>();

  router = inject(Router);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    const ds = this.dataSource();

    if (ds) {
      ds.sort = this.sort;
    }
  }

  addNewRecord() {
    this.router.navigate(['add-employee']);
  }

  emitTableAction(action: string, row: any) {
    this.tableActionEmitter.emit({ action, data: row });
  }
}
