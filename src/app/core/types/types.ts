export type Address = {
  type: string;
  line1: string;
  line2: string;
  city: string;
  pincode: number | null;
  state: string;
};

export type Employee = {
  id: number;
  name: string;
  department: string;
  designation: string;
  dob: string;
  address: Address[];
  education: string;
  joiningDate: string;
  experience: number | null;
  employmentType: string;
  status: string;
  salary: number | null;
  bonus: number | null;
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

export type TableFilterConfig = {
  key: string;
  label: string;
  type: 'select' | 'date' | 'text';
  options?: string[];
}

export type EditEmployeeDialogData = {
  title: string;
  editRowData: Employee,
}

export type CommonConfirmationData = {
  title: string,
  message: string,
}

export type LineChartData = {
  date: string;
  amount: number;
};

export type PieChartData = {
  department: string;
  salary: number;
};

export type BarChartData = {
  employmentType: string,
  salary: number
}
