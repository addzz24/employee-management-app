export type Address = {
  type: string;
  line1: string;
  line2: string;
  city: string;
  pincode: number;
  state: string;
};

export type Employee = {
  id: number;
  name: string;
  position: string;
  designation: string;
  dob: string;
  address: Address[];
  education: string;
  joiningDate: string;
  experience: number;
  employmentType: string;
  status: string;
  salary: number;
  bonus: number;
  currency: string;
};

export type TableAction = {
  label: string;
  icon: string;
  tooltip: string;
};

export type TableActionEvent = {
  action: any;
  data: any;
};
