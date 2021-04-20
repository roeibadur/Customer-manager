import { Component, OnInit, OnDestroy , DoCheck } from '@angular/core';
import { Customer } from '../customer.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../Store/app.reducer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent  implements OnInit , OnDestroy, DoCheck  {
  customers: Customer [] = [];
  totalprices: number [] = [] ;
  sum = 0;
  storeSub: Subscription;
  cardMode: boolean;
  listMode: boolean;
  searchText = '';
  constructor(
    private store: Store<fromApp.AppState>,
    private slCustomer: CustomerService,
    private router: Router) {}
  ngOnInit() {
    this.storeSub = this.store.select('customers').pipe( map(customerState =>
      customerState.customers)).subscribe(
        (customers: Customer []) => {
          this.customers = customers;
        }
      );
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
  ngDoCheck() {
    for (const customer of this.customers) {
      if (customer.orders) {
        for (const item of customer.orders) {
          this.sum += item.price;
        }
        this.totalprices.push(this.sum);
        this.sum = 0;
      }
    }
    this.cardMode = this.slCustomer.GetCardView();
    this.listMode = this.slCustomer.GetListView();
  }
  OnOrder(index: number) {
    this.router.navigate(['orders', index]);
  }
  OnEdit(index: number) {
    this.router.navigate(['customers', index]);
  }
}
