import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomers from '../customers/Store/customer.reducer';
import * as fromAuth from '../auth/Store/auth.reducer';

export interface AppState {
  customers: fromCustomers.State;
  auth: fromAuth.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  customers: fromCustomers.CustomerReducer,
  auth: fromAuth.authReducer
};

