import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    const user: {
      email: string,
      _tokenExpiredDate: string,
      token: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!user) {
      return next.handle(req);
    }
    else {
      const reqwithAuth = req.clone({
        setHeaders: {
          Authorization: "Bearer " + user.token
        }
      });
      return next.handle(reqwithAuth);
    }
  }
}
