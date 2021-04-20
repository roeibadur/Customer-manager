import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] sign up';
export const LOGIN_START =  '[Auth] login';
export const AUTHENTICATEFAIL = '[Auth] authenicate fail';
export const AUTHENTICATEFSUCCESS = '[Auth] authenicate success';
export const LOGOUT = '[Auth] logout';
export const AUTO_LOGIN = '[Auth] auto login';
export const CLEAR_ERROR = '[Auth] clear error';

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor( public payload: { email: string , password: string}) {}
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor( public payload: { email: string , password: string}) {}
}
export class AuthenicateFail implements Action {
  readonly type = AUTHENTICATEFAIL;
  constructor( public payload: string ) {}
}
export class AuthenicateSuccess implements Action {
  readonly type = AUTHENTICATEFSUCCESS;
  constructor( public payload: {
    email: string,
    expirationDate: Date,
    token: string,
    redirect: boolean
  }) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions = SignupStart | LoginStart | AuthenicateFail | AuthenicateSuccess | AutoLogin | Logout | ClearError;
