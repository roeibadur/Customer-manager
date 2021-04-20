import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import { Customer } from 'src/app/customers/customer.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit , OnDestroy {
  id: number;
  storeSub: Subscription;
  customer: Customer;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.init();
      }
    );
  }
  init() {
    this.storeSub = this.store.select('customers').pipe(
      map(CustomerState => {
        return CustomerState.customers.find((customers , index) => {
          return index === this.id;
        });
      })
    ).subscribe( customer => {
      this.customer = customer;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
