import { Customer } from '../customer.model';
import * as CustomerActions from './customer.actions';
export interface State {
  customers: Customer [];
}
const intialstate: State = {
  customers: []
};
export function CustomerReducer(state = intialstate , action: CustomerActions.CustomerActions) {
    switch (action.type) {
      case CustomerActions.ADD_CUSTOMER:
        return {
          ...state,
          customers: [...state.customers , action.payLoad ]
        };
      case CustomerActions.UPDATE_CUSTOMER:
        const updateCustomer  = {
            ...state.customers[action.payload.index],
            ...action.payload.newCustomer
        };
        const updateCostomers = [...state.customers];
        updateCostomers[action.payload.index] = updateCustomer;
        return {
          ...state,
          customers: updateCostomers
        };
      case CustomerActions.SET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload == null ? [] : [...action.payload]
        };
      case CustomerActions.DELETE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.filter((customer, index) => {
            return index !== action.payload;
          })
        };
      default:
        return state;
    }
}
