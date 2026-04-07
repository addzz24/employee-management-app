import {
  Component,
  ViewChild,
  AfterViewInit,
  input,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableAction, TableActionEvent } from '../../../core/types/types';
import { TitleCaseSplitPipe } from '../../../core/pipes/title-case-split.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TitleCaseSplitPipe,
  ],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements AfterViewInit {
  dataSource = input.required<MatTableDataSource<any>>();
  visibleColumns = input<string[]>([]);
  tableActions = input<TableAction[]>([]);
  tableActionEmitter = output<TableActionEvent>();

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    const ds = this.dataSource();
    if (ds) {
      ds.sort = this.sort;
    }
  }

  emitTableAction(action: string, row: any) {
    this.tableActionEmitter.emit({ action, data: row });
  }
}
