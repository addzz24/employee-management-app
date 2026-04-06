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
        path: 'employee-list',
        loadComponent: () =>
          import('../app/features/employee-list/employee-list.component').then(
            (m) => m.EmployeeListComponent,
          ),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('../app/features/add-employee/add-employee.component').then(
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
