import { UserModel } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: UserModel;
  authError: string;
}
const initState = {
  user: null,
  authError: null
};
export function authReducer(
  state = initState ,
  action: AuthActions.AuthActions) {
    switch (action.type) {
      case AuthActions.LOGIN_START:
      case AuthActions.SIGNUP_START:
        return {
          ...state,
          authError: null
        };
      case AuthActions.AUTHENTICATEFAIL:
          return {
            ...state,
            authError: action.payload
          };
      case AuthActions.AUTHENTICATEFSUCCESS:
        const user = new UserModel(
          action.payload.email,
          action.payload.expirationDate,
          action.payload.token
        );
        return {
          ...state,
          authError: null,
          user
        };
      case AuthActions.LOGOUT:
        return {
          ...state,
          user: null
        };
      case AuthActions.CLEAR_ERROR:
        return {
          ...state,
          authError: null
        };
      default: return state;
    }
  }
