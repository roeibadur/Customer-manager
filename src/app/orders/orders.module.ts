import { NgModule } from '@angular/core';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderEditComponent } from './order-edit/order-edit.component';
@NgModule({
  declarations: [AllOrdersComponent, OrderEditComponent],
  imports: [CommonModule , RouterModule.forChild([
    {path: '' , component: AllOrdersComponent},
    {path: ':id', component: OrderEditComponent}
  ])],
  exports: [AllOrdersComponent, OrderEditComponent]
})
export class OrdersMoudle {}
