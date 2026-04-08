import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

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
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
