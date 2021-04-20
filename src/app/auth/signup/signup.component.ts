import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../Store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../Store/auth.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {
  error: string = null;
  storeSub: Subscription;
  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private store: Store<fromApp.AppState>)  {}
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe( authState => {
      this.error = authState.authError;
    });
  }
  OnCancel() {
      this.router.navigate(['../'], { relativeTo: this.route});
  }

  OnSubmit( form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      if ( form.value.password !== form.value.password2 ) {
          alert ( 'the passwords not match');
      } else {
        this.store.dispatch(new AuthActions.SignupStart({email, password}));
      }
  }
  onHandleError() {
    this.store.dispatch( new AuthActions.ClearError());
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
