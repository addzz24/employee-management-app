import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonConfirmationData } from '../../../core/types/types';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {

    public data: CommonConfirmationData = inject(MAT_DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

    handleConfirm(){
      this.dialogRef.close({isConfirmed: true})
    }
}
