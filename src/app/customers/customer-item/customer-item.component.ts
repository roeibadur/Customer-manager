import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../customer.model';
import { Router } from '@angular/router';
import * as fromApp from '../../Store/app.reducer';
import { Store} from '@ngrx/store';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit, OnDestroy {
  storeSub: Subscription;
  isLogin: boolean;
  @Input() customer: Customer;
  @Input() index: number;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      if (authState.user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
  OnOrder() {
    this.router.navigate(['orders', this.index]);
  }
  OnEdit() {
    this.router.navigate(['customers', this.index]);
  }
}
