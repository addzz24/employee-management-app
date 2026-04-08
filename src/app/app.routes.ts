import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('../app/features/employees/employee-details/employee-details.component').then(
            (m) => m.EmployeeDetailsComponent,
          ),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('../app/features/employees/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent,
          ),
        canDeactivate: [pendingChangesGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
