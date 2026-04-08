import { FormGroup, FormControl, FormArray } from "@angular/forms";

export type AddressForm = FormGroup<{
  type: FormControl<string>;
  line1: FormControl<string>;
  line2: FormControl<string>;
  city: FormControl<string>;
  pincode: FormControl<number | null>;
  state: FormControl<string>;
}>;

export type EmployeeForm = FormGroup<{
  id: FormControl<number>;
  name: FormControl<string>;
  department: FormControl<string>;
  designation: FormControl<string>;
  dob: FormControl<string>;
  address: FormArray<AddressForm>;
  education: FormControl<string>;
  joiningDate: FormControl<string>;
  experience: FormControl<number | null>;
  employmentType: FormControl<string>;
  status: FormControl<string>;
  salary: FormControl<number | null>;
  bonus: FormControl<number | null>;
  currency: FormControl<string>;
}>;
