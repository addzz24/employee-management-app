import { Component, inject, input, OnInit, Inject, viewChild, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EmployeeForm, AddressForm } from '../../../core/types/form.types';
import { Employee } from '../../../core/types/types';
import {
  DEPARTMENTS,
  DESIGNATIONS,
  STATUSES,
  EMPLOYMENT_TYPES,
} from '../../../shared/constants/constants';

@Component({
  selector: 'app-employee-form',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  standalone: true,
})
export class EmployeeFormComponent implements OnInit {
  departments = DEPARTMENTS;
  designations = DESIGNATIONS;
  statuses = STATUSES;
  employmentTypes = EMPLOYMENT_TYPES;
  employeeForm!: EmployeeForm;

  isEditMode = input<boolean>(false);
  data: any = input<Employee | null>(null);
  formSubmit = output<Employee>();

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();

    if (this.data && this.isEditMode()) {
      this.patchForm(this.data);
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      id: this.fb.nonNullable.control(0),
      name: this.fb.nonNullable.control('', Validators.required),
      department: this.fb.nonNullable.control('', Validators.required),
      designation: this.fb.nonNullable.control('', Validators.required),
      dob: this.fb.nonNullable.control('', Validators.required),
      address: this.fb.array([this.createAddressGroup()]),
      country: this.fb.nonNullable.control(''),
      education: this.fb.nonNullable.control(''),
      joiningDate: this.fb.nonNullable.control('', Validators.required),
      experience: this.fb.control<number | null>(null, Validators.required),
      employmentType: this.fb.nonNullable.control('', Validators.required),
      status: this.fb.nonNullable.control('', Validators.required),
      salary: this.fb.control<number | null>(null),
      bonus: this.fb.control<number | null>(null),
      currency: this.fb.nonNullable.control('INR'),
    });
  }

  createAddressGroup() {
    return this.fb.group({
      type: this.fb.nonNullable.control(''),
      line1: this.fb.nonNullable.control('', Validators.required),
      line2: this.fb.nonNullable.control(''),
      city: this.fb.nonNullable.control('', Validators.required),
      pincode: this.fb.control<number | null>(null, Validators.required),
      state: this.fb.nonNullable.control('', Validators.required),
    });
  }

  addAddress(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.addressArray.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    this.addressArray.removeAt(index);
  }

  patchForm(data: any) {
    this.employeeForm.patchValue(data);

    if (data.address?.length) {
      this.employeeForm.setControl(
        'address',
        this.fb.array<AddressForm>(
          data.address.map((a: any) =>
            this.fb.group({
              type: this.fb.nonNullable.control(a.type),
              line1: this.fb.nonNullable.control(a.line1, Validators.required),
              line2: this.fb.nonNullable.control(a.line2),
              city: this.fb.nonNullable.control(a.city, Validators.required),
              pincode: this.fb.nonNullable.control(a.pincode, [
                Validators.required,
                Validators.minLength(6),
              ]),
              state: this.fb.nonNullable.control(a.state),
            }),
          ),
        ),
      );
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.employeeForm.getRawValue());
    this.employeeForm.reset();
  }
  get getFormControls() {
    return this.employeeForm.controls;
  }

  get getAddressFormControls() {
    return this.employeeForm.controls.address;
  }

  get addressArray(): FormArray {
    return this.employeeForm.controls.address as FormArray;
  }

  getAddressGroup(index: number): FormGroup {
    return this.addressArray.at(index) as FormGroup;
  }

  getAddressControls(index: number) {
    return this.getAddressGroup(index).controls;
  }
}
