import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditEmployeeDialogData, Employee } from '../../../core/types/types';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [CommonModule, EmployeeFormComponent, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
})
export class EditEmployeeDialogComponent {

    rowData!: Employee;

    public data: EditEmployeeDialogData = inject(MAT_DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<EditEmployeeDialogComponent>);

    constructor(){
        this.rowData = JSON.parse(JSON.stringify(this.data.editRowData))
    }

    handleFormSubmit(event: Employee){
      // Updated data will get sent to employee details from which this dialog is opened
      this.dialogRef.close(event)
    }
}
