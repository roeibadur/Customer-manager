import { Component, OnInit , EventEmitter , Output, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as fromApp from '../../Store/app.reducer';
import * as CustomersActions from '../Store/customer.actions';
import { Store } from '@ngrx/store';
import { Customer } from '../customer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  @Output() close = new EventEmitter <void> ();
  orderTotal = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) {}
  customerForm: FormGroup;
  ngOnInit() {
    this.initForm();
  }
  Onsubmit() {
    for (const value of this.customerForm.value.orders) {
      this.orderTotal += value.price;
    }

    const customer: Customer = {
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      city: this.customerForm.value.city,
      country: this.customerForm.value.country,
      orders: this.customerForm.value.orders,
      imagePath: this.customerForm.value.gender === 'male' ? '../../../assets/images/manIcon.png' : '../../../assets/images/womenIcon.png',
      orderTotal: this.orderTotal
    };
    this.store.dispatch( new CustomersActions.AddCustomer(customer));
    this.store.dispatch( new CustomersActions.StroingCustomer());
    this.close.emit();
  }
  initForm() {
    this.customerForm = new FormGroup({
     firstName: new FormControl(null, Validators.required),
     lastName: new FormControl(null, Validators.required),
     city: new FormControl(null, Validators.required),
     country: new FormControl(null, Validators.required),
     gender: new FormControl(null, Validators.required),
     orders: new FormArray([])
    });
  }
  get controls() {
    return ( <FormArray> this.customerForm.get('orders')).controls;
  }
  AddOrder() {
    (<FormArray> this.customerForm.get('orders')).push(
        new FormGroup({
         name: new FormControl(null, Validators.required),
         price: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
  }
  RemoveOrder(index: number) {
    (<FormArray> this.customerForm.get('orders')).removeAt(index);
  }
  OnCancel() {
    this.close.emit();
  }

}
