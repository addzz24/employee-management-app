import { Employee, TableFilterConfig } from '../../core/types/types';

export const EMPLOYEE_DISPLAYED_COLUMNS: string[] = [
  'name',
  'department',
  'designation',
  'dob',
  'joiningDate',
  'experience',
  'employmentType',
  'status',
  'currency',
  'actions',
];

export const DEPARTMENTS = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];

export const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contractor', 'Intern'];

export const STATUSES = ['Active', 'Inactive'];

export const DESIGNATIONS = [
  'Frontend Developer',
  'Senior Project Manager',
  'Lead UX Designer',
  'Junior Data Analyst',
  'HR Manager',
  'Senior DevOps Engineer',
  'Junior HR Specialist',
  'SDE2',
  'SDE1'
];

export const EMPLOYEE_TABLE_ACTIONS = [
  { label: 'Edit', icon: 'edit', tooltip: 'Edit Employee' },
  { label: 'Delete', icon: 'delete', tooltip: 'Delete Employee' },
];

export const FILTER_CONFIGS : TableFilterConfig[] = [
  {
    key: 'department',
    label: 'Department',
    type: 'select',
    options: DEPARTMENTS,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: STATUSES,
  },
  {
    key: 'designation',
    label: 'Designation',
    type: 'select',
    options: DESIGNATIONS,
  },
];

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Engineering',
    designation: 'Frontend Developer',
    dob: '1990-01-01',
    address: [
      {
        type: 'Home',
        line1: '123 Main St',
        line2: 'Apt 4B',
        city: 'New York',
        pincode: 10001,
        state: 'NY',
      },
    ],
    education: 'B.Sc. Computer Science',
    joiningDate: '2020-06-15',
    experience: 5,
    employmentType: 'Contractor',
    status: 'Active',
    salary: 80000,
    bonus: 5000,
    currency: 'INR',
  },
  {
    id: 2,
    name: 'Jane Smith',
    department: 'Engineering',
    designation: 'Senior Project Manager',
    dob: '1985-05-20',
    address: [
      {
        type: 'Home',
        line1: '456 Elm St',
        line2: '',
        city: 'Los Angeles',
        pincode: 90001,
        state: 'CA',
      },
    ],
    education: 'MBA',
    joiningDate: '2018-03-10',
    experience: 10,
    employmentType: 'Full-time',
    status: 'Active',
    salary: 120000,
    bonus: 10000,
    currency: 'USD',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    department: 'Engineering',
    designation: 'Lead UX Designer',
    dob: '1992-09-15',
    address: [
      {
        type: 'Home',
        line1: '789 Oak St',
        line2: 'Suite 5C',
        city: 'Chicago',
        pincode: 60601,
        state: 'IL',
      },
    ],
    education: 'B.Des. UX Design',
    joiningDate: '2019-11-01',
    experience: 7,
    employmentType: 'Full-time',
    status: 'Inactive',
    salary: 90000,
    bonus: 7000,
    currency: 'USD',
  },
  {
    id: 4,
    name: 'Bob Williams',
    department: 'Engineering',
    designation: 'Junior Data Analyst',
    dob: '1995-12-10',
    address: [
      {
        type: 'Home',
        line1: '321 Pine St',
        line2: '',
        city: 'San Francisco',
        pincode: 94101,
        state: 'CA',
      },
    ],
    education: 'B.Sc. Data Science',
    joiningDate: '2021-01-20',
    experience: 2,
    employmentType: 'Contractor',
    status: 'Inactive',
    salary: 70000,
    bonus: 3000,
    currency: 'USD',
  },
  {
    id: 5,
    name: 'Emily Davis',
    department: 'HR',
    designation: 'HR Manager',
    dob: '1988-07-30',
    address: [
      {
        type: 'Home',
        line1: '654 Cedar St',
        line2: 'Apt 2A',
        city: 'Seattle',
        pincode: 98101,
        state: 'WA',
      },
    ],
    education: 'B.A. Human Resources',
    joiningDate: '2017-05-15',
    experience: 8,
    employmentType: 'Full-time',
    status: 'Active',
    salary: 85000,
    bonus: 6000,
    currency: 'INR',
  },
  {
    id: 6,
    name: 'Michael Brown',
    department: 'HR',
    designation: 'Junior HR Specialist',
    dob: '1987-03-25',
    address: [
      {
        type: 'Home',
        line1: '987 Maple St',
        line2: '',
        city: 'Austin',
        pincode: 73301,
        state: 'TX',
      },
    ],
    education: 'MBA Human Resources',
    joiningDate: '2016-09-01',
    experience: 9,
    employmentType: 'Full-time',
    status: 'Active',
    salary: 95000,
    bonus: 8000,
    currency: 'INR',
  },
];
