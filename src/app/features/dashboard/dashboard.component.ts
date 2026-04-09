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

  readonly totalSalary = computed(() => {
    return this.store.employees().reduce((sum, employee) => sum + (employee.salary || 0), 0);
  });

  readonly totalBonus = computed(() => {
    return this.store.employees().reduce((sum, employee) => sum + (employee.bonus || 0), 0);
  });

  readonly netProfit = computed(() => {
    return this.totalBonus() - this.totalSalary() * 0.08;
  });

  readonly profitTrend = computed(() => {
    const costs = this.totalSalary();
    if (costs === 0) return 0;
    return Math.round((this.netProfit() / costs) * 100 * 100) / 100;
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
      employmentType: item.name,
      salary: item.value,
    }));
  });

  pieChartData = computed<PieChartData[]>(() => {
    return this.store.employmentTypeChart().map((item) => ({
      department: item.name,
      salary: item.value,
    }));
  });

  pieChartLegend = computed(() => {
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
    return [...this.pieChartData()]
      .sort((a, b) => a.department.localeCompare(b.department))
      .map((item, index) => ({
        department: item.department,
        color: colors[index % colors.length],
      }));
  });

  activeEmployeeTrend = computed(() => {
    const totalEmployees = this.store.employees().length;
    return totalEmployees === 0
      ? 0
      : Math.round((this.store.activeCount() / totalEmployees) * 100 * 100) / 100;
  });

  payrollTrend = computed(() => {
    const totalEmployees = this.store.employees().length;
    return totalEmployees === 0
      ? 0
      : Math.round((this.store.totalPayroll() / totalEmployees / 10000) * 100) / 100;
  });

  experienceTrend = computed(() => {
    return Math.round((this.store.avgExperience() / 10) * 100 * 100) / 100;
  });

  isPayrollPositive = computed(() => this.payrollTrend() >= 0);
  isExperiencePositive = computed(() => this.experienceTrend() >= 0);

  onBarChartCategoryClick(category: string) {
    console.log('Bar chart category clicked:', category);
  }

  onPieChartStatusClick(status: string) {
    console.log('Pie chart status clicked:', status);
  }
}
