import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './Store/auth.action';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
selector: 'app-auth',
templateUrl: './auth.component.html',
styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  error: string = null;
  storeSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

    ngOnInit() {
      this.storeSub = this.store.select('auth').subscribe( authState => {
        this.error = authState.authError;
      });
    }

  OnSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.store.dispatch( new AuthActions.LoginStart({email , password}));
  }
  OnSignup() {
    this.router.navigate(['signup'], { relativeTo: this.route});
  }
  onHandleError() {
    this.store.dispatch( new AuthActions.ClearError());
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
