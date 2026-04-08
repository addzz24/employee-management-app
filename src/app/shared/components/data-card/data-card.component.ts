import { Component, input, output, signal } from '@angular/core';
import { Employee } from '../../../core/types/types';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-data-card',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatTooltip],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss',
})
export class DataCardComponent {
  employee = input.required<Employee>();
  delete = output<any>();

  isFlipped = signal(false);

  toggleFlip() {
    this.isFlipped.update(v => !v);
  }

  onDelete() {
    this.delete.emit({ action: 'Delete', data: this.employee() });
  }
}
