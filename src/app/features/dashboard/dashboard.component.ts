import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GlobalStore } from '../../store/global/global.store';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { BarChartData, PieChartData } from '../../core/types/types';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIcon,
    MatProgressSpinnerModule,
    CommonModule,
    PieChartComponent,
    BarChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly store = inject(GlobalStore);
  private employeeService = inject(EmployeeService);
  readonly isLoading = signal(false);

  readonly totalRevenue = computed(() => {
    return this.store.employees().reduce((sum, employee) => sum + (employee.bonus || 0), 0);
  });

  readonly totalCosts = computed(() => {
    return this.store.employees().reduce((sum, employee) => sum + (employee.salary || 0), 0);
  });

  readonly netProfit = computed(() => {
    return this.totalRevenue() - this.totalCosts() * 0.08;
  });

  readonly profitTrend = computed(() => {
    const revenue = this.totalRevenue();
    const costs = this.totalCosts();
    if (costs === 0) return 0;
    const profitMargin = ((revenue - costs * 0.08) / costs) * 100;
    return Math.round(profitMargin * 100) / 100;
  });

  readonly isProfitPositive = computed(() => this.profitTrend() >= 0);

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.employeeService
      .getEmployees(1, 1000)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.store.setEmployees(res.data);
        },
        error: () => console.error('Failed to fetch employees for dashboard'),
      });
  }

  barChartData = computed<BarChartData[]>(() => {
    return this.store.employeesByDeptChart().map((item) => ({
      category: item.name,
      amount: item.value,
    }));
  });

  pieChartData = computed<PieChartData[]>(() => {
    return this.store.employmentTypeChart().map((item) => ({
      status: item.name,
      amount: item.value,
    }));
  });

  onBarChartCategoryClick(category: string) {
    console.log('Bar chart category clicked:', category);
  }

  onPieChartStatusClick(status: string) {
    console.log('Pie chart status clicked:', status);
  }
}
