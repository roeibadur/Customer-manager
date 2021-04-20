import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/Store/auth.action';


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit , OnDestroy {
  storeSub: Subscription;
  isLogin: boolean;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authstate => {
      if (authstate.user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  OnLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
