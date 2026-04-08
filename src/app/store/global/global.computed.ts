import { computed } from '@angular/core';

export const globalComputed = (state: any) => {

  // 1. First, we define the filteredEmployees as it is a dependency for charts
  const filteredEmployees = computed(() => {
    let list = state.employees();
    const filters = state.filters();

    if (filters.search) {
      const query = filters.search.toLowerCase();
      list = list.filter((e: any) =>
        e.name.toLowerCase().includes(query) ||
        e.designation.toLowerCase().includes(query)
      );
    }

    if (filters.department) {
      list = list.filter((e: any) => e.department === filters.department);
    }

    if (filters.status) {
      list = list.filter((e: any) => e.status === filters.status);
    }

    return list;
  });

  return {
    /**
     * KPI VALUES
     */
    activeCount: computed(() =>
      state.employees().filter((e: any) => e.status === 'Active').length
    ),

    avgExperience: computed(() => {
      const list = state.employees();
      if (list.length === 0) return 0;
      const total = list.reduce((sum: number, e: any) => sum + (e.experience || 0), 0);
      return Math.round(total / list.length);
    }),

    /**
     * FILTERED LIST REFERENCE
     */
    filteredEmployees,

    /**
     * FINANCIAL ANALYTICS
     */
    totalPayroll: computed(() =>
      filteredEmployees().reduce((sum: number, e: any) => sum + (e.salary || 0) + (e.bonus || 0), 0)
    ),

    /**
     * BAR CHART: Employees by Department
     */
    employeesByDeptChart: computed(() => {
      const map = new Map<string, number>();

      filteredEmployees().forEach((e: any) => {
        map.set(e.department, (map.get(e.department) || 0) + 1);
      });

      return Array.from(map, ([name, value]) => ({ name, value }));
    }),

    /**
     * PIE CHART: Employment Type Distribution
     */
    employmentTypeChart: computed(() => {
      const map = new Map<string, number>();

      filteredEmployees().forEach((e: any) => {
        map.set(e.employmentType, (map.get(e.employmentType) || 0) + 1);
      });

      return Array.from(map, ([name, value]) => ({ name, value }));
    }),

    /**
     * PIE CHART: Status Distribution
     */
    statusDistribution: computed(() => {
      const map = new Map<string, number>();

      filteredEmployees().forEach((e: any) => {
        map.set(e.status, (map.get(e.status) || 0) + 1);
      });

      return Array.from(map, ([name, value]) => ({ name, value }));
    })
  };
};
