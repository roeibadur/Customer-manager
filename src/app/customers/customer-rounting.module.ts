import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';

const customersRoutes: Routes = [
  {path: '', component: CustomersComponent, children: [
    {path: 'add-customer', component: NewCustomerComponent , canActivate: [AuthGuard]},
    {path: 'customers-list', component: CustomersListComponent},
    {path: ':id', component: CustomerEditComponent , canActivate: [AuthGuard]}
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule]
})
export class CustomersRountingModule {}
