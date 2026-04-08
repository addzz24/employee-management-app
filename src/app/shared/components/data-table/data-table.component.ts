import {
  Component,
  ViewChild,
  input,
  output,
  OnChanges,
} from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableAction, TableActionEvent } from '../../../core/types/types';
import { TitleCaseSplitPipe } from '../../../core/pipes/title-case-split.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinner,
    MatChipsModule,
    TitleCaseSplitPipe
],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnChanges{
  dataSource = input.required<MatTableDataSource<any>>();
  visibleColumns = input<string[]>([]);
  tableActions = input<TableAction[]>([]);
  loading = input(false);
  tableActionEmitter = output<TableActionEvent>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    const ds = this.dataSource();
    if (ds) {
      ds.sort = this.sort;
    }
  }

  emitTableAction(action: string, row: any) {
    this.tableActionEmitter.emit({ action, data: row });
  }
}
