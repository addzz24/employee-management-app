import { Component, computed, inject, OnInit } from '@angular/core';
import { GlobalStore } from '../../store/global/global.store';
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { PieChartComponent } from "../../shared/components/pie-chart/pie-chart.component";
import { BarChartComponent } from "../../shared/components/bar-chart/bar-chart.component";
import { BarChartData, PieChartData } from '../../core/types/types';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIcon, CommonModule, PieChartComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent implements OnInit {
  readonly store = inject(GlobalStore);
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .getEmployees(1, 1000) // Load all employees for dashboard
      .pipe(finalize(() => {}))
      .subscribe({
        next: (res) => {
          this.store.setEmployees(res.data);
        },
        error: () => console.error('Failed to fetch employees for dashboard'),
      });
  }

  // Transform data to match chart component types
  barChartData = computed<BarChartData[]>(() => {
    return this.store.employeesByDeptChart().map(item => ({
      category: item.name,
      amount: item.value
    }));
  });

  pieChartData = computed<PieChartData[]>(() => {
    return this.store.employmentTypeChart().map(item => ({
      status: item.name,
      amount: item.value
    }));
  });

  onBarChartCategoryClick(category: string) {
    console.log('Bar chart category clicked:', category);
  }

  onPieChartStatusClick(status: string) {
    console.log('Pie chart status clicked:', status);
  }
}
