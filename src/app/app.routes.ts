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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
