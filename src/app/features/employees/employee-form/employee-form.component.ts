import {
  Component,
  inject,
  OnInit,
  output,
  Input,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isEditMode = input(false);
  data = input<Employee | null>();
  formSubmit = output<Employee>();

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initForm();

    const emp = this.data();
    if (emp && this.isEditMode()) {
      this.patchForm(emp);
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      id: this.fb.nonNullable.control(0),
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      department: this.fb.nonNullable.control('', [Validators.required]),
      designation: this.fb.nonNullable.control('', [Validators.required]),
      dob: this.fb.nonNullable.control('', Validators.required),
      address: this.fb.array([this.createAddressGroup()], Validators.required),
      education: this.fb.nonNullable.control('', [
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      joiningDate: this.fb.nonNullable.control('', Validators.required),
      experience: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(50),
      ]),
      employmentType: this.fb.nonNullable.control('', Validators.required),
      status: this.fb.nonNullable.control('', Validators.required),
      salary: this.fb.control<number | null>(null, [Validators.min(0), Validators.max(10000000)]),
      bonus: this.fb.control<number | null>(null, [Validators.min(0), Validators.max(5000000)]),
      currency: this.fb.nonNullable.control('INR', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
    });
  }

  createAddressGroup() {
    return this.fb.group({
      type: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      line1: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      line2: this.fb.nonNullable.control('', [Validators.maxLength(100)]),
      city: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      pincode: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(1000),
        Validators.max(99999999),
      ]),
      state: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
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
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 6000,
      });
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

  blockNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
