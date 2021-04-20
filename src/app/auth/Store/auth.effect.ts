import { Injectable } from '@angular/core';
import { Effect , Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap , map , tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface AuthResponseData {
  msg: string;
  email: string;
  token: string;
}

const hadleAuthentication = (email: string, msg: string, token: string) => {
  if (msg === 'User Connected' || msg === 'User added successfully') {
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      const user = new UserModel(email , expirationDate, token);
      localStorage.setItem('userData', JSON.stringify(user));
      return new AuthActions.AuthenicateSuccess({
        email,
        expirationDate,
        token,
        redirect: true
      });
  }
  else {
    let errorMessage = 'An unknow error occurred';
    switch (msg) {
      case 'EMAIL_EXIST':
        errorMessage = 'this mail exist already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'the password  is not correct';
        break;
    }
    return new AuthActions.AuthenicateFail(errorMessage);
  }
};

@Injectable()
export class AuthEffects {
   constructor(
    private action$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) {}

   @Effect()
    authSignup = this.action$.pipe(
     ofType(AuthActions.SIGNUP_START),
     switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http.post<AuthResponseData>('https://morning-meadow-66437.herokuapp.com/https://roeibadur-customer-manager.herokuapp.com/Users/Signup',
       {
         email: signupAction.payload.email,
         password: signupAction.payload.password
       }).pipe(
         tap(() => {
           this.authService.setLogoutTimer(3600 * 1000);
         }),
         map(resData => {
           return hadleAuthentication(resData.email , resData.msg,resData.token);
         })
       );
     })
   );
   @Effect()
   authSignin = this.action$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>('https://morning-meadow-66437.herokuapp.com/https://roeibadur-customer-manager.herokuapp.com/Users/Signin', {
            email: authData.payload.email,
            password: authData.payload.password
          }).pipe(map(resData => {
            return hadleAuthentication(resData.email , resData.msg,resData.token);
          })
      );
    }),
  );
  @Effect({dispatch: false})
  authLogout = this.action$.pipe(
    ofType(AuthActions.LOGOUT), tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
  @Effect()
  autoLogin = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(
      () => {
        const userData: {
          email: string,
          _tokenExpiredDate: string,
          token: string
        } = JSON.parse(localStorage.getItem('userData'));
        if ( !userData) {
          return { type: 'DUMMY'};
        }
        const loaderUser = new UserModel(
          userData.email,
          new Date(userData._tokenExpiredDate),
          userData.token);
        if (loaderUser._tokenExpiredDate > new Date()) {
          const expirationDuration = new Date(userData._tokenExpiredDate).getTime() -
          new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.AuthenicateSuccess({
            email: loaderUser.email,
            expirationDate: new Date(userData._tokenExpiredDate),
            token: loaderUser.token,
            redirect: true
          });
        }
        return { type: 'DUMMY'};
      }
    )
  );
  @Effect({dispatch: false})
  authRedirect = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATEFSUCCESS),
    tap((authSuccess: AuthActions.AuthenicateSuccess) => {
      if (authSuccess.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

}

