import { Employee } from "../../core/types/types";

export interface EmployeeFilters {
  search: string;
  department: string | null;
  status: string | null;
  employmentType: string | null;
}

export interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  filters: EmployeeFilters;
}

export const initialGlobalState: EmployeeState = {
  employees: [],
  isLoading: false,
  filters: {
    search: '',
    department: null,
    status: null,
    employmentType: null,
  },
};
