import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import { Observable } from 'rxjs';
import { take , map } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) {}
    canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot):
    boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.store.select('auth').pipe(take(1),
        map(authState => {
          return authState.user;
        }),
        map(user => {
          const isAuth = !! user;
          if (isAuth) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth']);
          }
          })
      );
  }
}
