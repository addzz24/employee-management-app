import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.scss',
})
export class TableToolbarComponent {

  // Inputs
  showSearch = input(true);
  showFilters = input(true);
  showToggle = input(true);

  filters = input<any[]>([]);

  // Outputs
  searchChange = output<string>();
  filterChange = output<any>();
  toggleChange = output<boolean>();

  searchValue = '';
  toggleValue = false;

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onFilterChange(key: string, value: any) {
    this.filterChange.emit({ key, value });
  }

  onToggleChange(value: boolean) {
    this.toggleChange.emit(value);
  }
}
