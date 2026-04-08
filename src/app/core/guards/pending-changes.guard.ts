import { CanDeactivateFn } from "@angular/router";
import { AddEmployeeComponent } from "../../features/employees/add-employee/add-employee.component";

export const pendingChangesGuard: CanDeactivateFn<AddEmployeeComponent> = (component) => {
  const isDirty = component.employeeFormComponent?.employeeForm.dirty;

  if (!isDirty) {
    return true;
  }

  return component.confirmDiscard();
};
