import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup , FormControl , Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import { Customer } from '../customer.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CustomerActions from '../Store/customer.actions';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit , OnDestroy {
  id: number;
  customer: Customer;
  orderTotal = 0;
  customerForm: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private rounter: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.initForm();
      }
    );
  }

  initForm() {
    this.storeSub = this.store.select('customers').pipe(
      map(CustomerState => {
        return CustomerState.customers.find((customers , index) => {
          return index === this.id;
        });
      })
    ).subscribe( customer => {
      this.customer = customer;
    });
    this.customerForm = new FormGroup({
      firstName: new FormControl(this.customer.firstName, Validators.required),
      lastName: new FormControl(this.customer.lastName, Validators.required),
      city: new FormControl(this.customer.city, Validators.required),
      country: new FormControl(this.customer.country, Validators.required),
      orders: new FormArray([])
    });
    this.getOrders();
  }

  RemoveOrder(index: number) {
    ( <FormArray> this.customerForm.get('orders')).removeAt(index);
  }

  getOrders() {
    if (this.customer.orders) {
      for (const item of this.customer.orders) {
        (<FormArray> this.customerForm.get('orders')).push(
          new FormGroup({
          name: new FormControl(item.name, Validators.required),
          price: new FormControl(item.price, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
      }
    }
  }
  get controls() {
    return ( <FormArray> this.customerForm.get('orders')).controls;
  }

  Onsubmit() {
    for ( const value of this.customerForm.value.orders) {
      this.orderTotal += value.price;
    }
    const newCustomer: Customer =  {
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      city: this.customerForm.value.city,
      country: this.customerForm.value.country,
      orders: this.customerForm.value.orders,
      imagePath: this.customer.imagePath,
      orderTotal: this.orderTotal
    };
    this.store.dispatch( new CustomerActions.UpdateCustomer({index: this.id , newCustomer}));
    this.store.dispatch(new CustomerActions.StroingCustomer());
    this.rounter.navigate(['']);
  }
  AddOrder() {
    (<FormArray> this.customerForm.get('orders')).push(
        new FormGroup({
         name: new FormControl(null, Validators.required),
         price: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
  }

  OnCancel() {
    this.rounter.navigate(['']);
  }
  OnDelete() {
    this.store.dispatch(new CustomerActions.DeleteCustomer(this.id));
    this.store.dispatch(new CustomerActions.StroingCustomer());
    this.rounter.navigate(['']);
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
