import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './Store/app.reducer';
import * as CustomerActions from './customers/Store/customer.actions';
import * as AuthActions from './auth/Store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Customer-Manager';
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new CustomerActions.GetCustomers());
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
