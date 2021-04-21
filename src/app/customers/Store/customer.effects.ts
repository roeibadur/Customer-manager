import { Actions , Effect , ofType } from '@ngrx/effects';
import * as CustomerActions from './customer.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom , map } from 'rxjs/operators';
import { Customer } from '../customer.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
@Injectable()
export class CustomerEffects {
  @Effect()
    customers = this.actions$.pipe(
      ofType(CustomerActions.GET_CUSTOMERS),
      switchMap(() => {
        return this.http.get <Customer []>(
          'https://cors-anywhere.herokuapp.com/https://roeibadur-customer-manager.herokuapp.com/Customers');
      }),
      map(customers => {
        return new CustomerActions.SetCustomer(customers);
      })
    );
  @Effect({dispatch: false})
   stroingCustomers = this.actions$.pipe(
    ofType(CustomerActions.STRING_CUSTOMERS),
    withLatestFrom(this.store.select('customers')),
    switchMap(([actionData , customerState]) => {
      return this.http.put('https://cors-anywhere.herokuapp.com/https://roeibadur-customer-manager.herokuapp.com/Customers/Update',
      customerState.customers);
    })
   );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {}
}

