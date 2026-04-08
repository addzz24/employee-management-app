import { patchState } from '@ngrx/signals';
import { STORAGE_KEY } from './global.store';
import { Employee } from '../../core/types/types';

export const globalMethods = (store: any) => ({
  /**
   * Sync API data to Store and LocalStorage
   */
  setEmployees(data: Employee[]) {
    // 1. Update the SignalStore state
    patchState(store, { employees: data });

    // 2. Persist to LocalStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Load data from LocalStorage on app initialization
   */
  loadFromStorage() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      patchState(store, { employees: JSON.parse(storedData) });
    }
  },

  updateFilters(filters: any) {
    patchState(store, (state: any) => ({
      filters: { ...state.filters, ...filters }
    }));
  }
});
