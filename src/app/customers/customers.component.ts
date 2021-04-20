import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import * as fromApp from '../Store/app.reducer';
import { Store} from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  cardMode = true;
  listMode = false;
  addCustomer = false;
  storeSub: Subscription;
  isLogin: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private slCustomer: CustomerService,
    private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.addCustomer = false;
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
  OnCardView() {
    this.cardMode = true;
    this.listMode = false;
    this.slCustomer.SetCardView(this.cardMode);
    this.slCustomer.SetListView(this.listMode);
    this.router.navigate(['customers-list'], {relativeTo: this.route});
  }
  OnListView() {
    this.cardMode = false;
    this.listMode = true;
    this.slCustomer.SetCardView(this.cardMode);
    this.slCustomer.SetListView(this.listMode);
    this.router.navigate(['customers-list'], {relativeTo: this.route});
  }
  newCustomer() {
    this.addCustomer = this.addCustomer ? false : true;
  }
}
