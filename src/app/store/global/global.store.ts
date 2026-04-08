import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals'

import { initialGlobalState } from './global.state';
import { globalComputed } from './global.computed';
import { globalMethods } from './global.methods';

export const STORAGE_KEY = 'employees';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialGlobalState),
  withComputed(globalComputed),
  withMethods(globalMethods)
)
