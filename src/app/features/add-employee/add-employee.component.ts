import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeFormComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {


  handleFormSubmit(formValue: any) {
    console.log(formValue);
  }

}
