import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';

export const GET_CUSTOMERS = '[Customer] get all customers';
export const ADD_CUSTOMER = '[Customer] add customer';
export const UPDATE_CUSTOMER = '[Customer] update a customer';
export const STRING_CUSTOMERS = '[Customer] save the customers';
export const SET_CUSTOMERS = '[Customer] set a customers';
export const DELETE_CUSTOMER = '[Customer] delete a customer';
export class GetCustomers implements Action {
  readonly type = GET_CUSTOMERS;
}
export class AddCustomer implements Action {
  readonly type = ADD_CUSTOMER;
  constructor(public payLoad: Customer) {}
}
export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;
  constructor(public payload: {index: number , newCustomer: Customer}) {}
}
export class StroingCustomer implements Action {
  readonly type = STRING_CUSTOMERS;
}
export class SetCustomer implements Action {
  readonly type = SET_CUSTOMERS;
  constructor(public payload: Customer []) {}
}
export class DeleteCustomer implements Action {
  readonly type = DELETE_CUSTOMER;
  constructor(public payload: number) {}
}
export type CustomerActions = GetCustomers | AddCustomer | UpdateCustomer | StroingCustomer | SetCustomer | DeleteCustomer;
