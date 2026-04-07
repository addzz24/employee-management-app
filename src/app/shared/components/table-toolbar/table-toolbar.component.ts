import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TableFilterConfig } from '../../../core/types/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [
     CommonModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule, MatInputModule, FormsModule,
  ],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.scss',
})
export class TableToolbarComponent {

    filters: any = {};
    filtersConfig = input<TableFilterConfig[]>([]);
    searchTerm = signal('');
    searchSub$ = new Subject();

    apply = output();
    reset = output();
    searchChange = output<string>();

    applyFilters() {
      this.apply.emit(this.filters);
    }

    resetFilters() {
      this.filters = {};
      this.reset.emit();
    }


  constructor(){
    this.searchSub$.pipe(
      debounceTime(400)
    ).subscribe((value:any)=>{
       this.searchChange.emit(value);
    })
  }

  onSearch() {
   this.searchSub$.next(this.searchTerm())
  }
}
