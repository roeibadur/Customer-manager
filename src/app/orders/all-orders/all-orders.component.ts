import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import * as fromApp from '../../Store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit , OnDestroy {
  storeSub: Subscription;
  customers: Customer [] = [];
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.storeSub = this.store.select('customers').subscribe(
      AuthState => {
        this.customers = AuthState.customers;
      }
    );
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
