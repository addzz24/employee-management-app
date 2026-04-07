import { Component, input, output, signal, ViewChild } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TableFilterConfig } from '../../../core/types/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule
],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.scss',
})
export class TableToolbarComponent {
  filters: any = {};
  searchTerm = signal('');
  searchSub$ = new Subject();

  filtersConfig = input<TableFilterConfig[]>([]);

  apply = output();
  reset = output();
  searchChange = output<string>();

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor() {
    this.searchSub$.pipe(debounceTime(400)).subscribe((value: any) => {
      this.searchChange.emit(value);
    });
  }

  applyFilters() {
    this.apply.emit(this.filters);
    this.menuTrigger.closeMenu();
  }

  resetFilters() {
    this.filters = {};
    this.reset.emit();
    this.menuTrigger.closeMenu();
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
    this.searchSub$.next(value);
  }
}
