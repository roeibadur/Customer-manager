import { NgModule } from '@angular/core';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomersRountingModule } from './customer-rounting.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersComponent } from './customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from './customers-list/filter.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CustomerEditComponent,
    CustomerItemComponent,
    CustomersListComponent,
    NewCustomerComponent,
    CustomersComponent,
    FilterPipe,
    CustomersTableComponent
  ],
  imports: [
    CustomersRountingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CustomerEditComponent,
    CustomerItemComponent,
    CustomersListComponent,
    NewCustomerComponent,
    CustomersComponent,
    FilterPipe]
})
export class CustomersModule {}
