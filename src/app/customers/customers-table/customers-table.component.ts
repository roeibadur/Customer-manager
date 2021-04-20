import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../customer.model';
import { Store} from '@ngrx/store';
import * as FromApp from '../../Store/app.reducer';
import { Router } from '@angular/router';

export interface Table {
  customer: Customer;
  index: number ;
}
@Component({
  selector: 'app-customers-table',
  styleUrls: ['./customers-table.component.css'],
  templateUrl: './customers-table.component.html',
})

export class CustomersTableComponent implements OnInit {
  displayedColumns: string[] = ['Img', 'FirstName', 'LastName', 'City', 'Country', 'OrderTotal', 'Link'];
  customers: Customer [] = [];
  indexs: number [] = [];
  i = 0;
  dataSource: MatTableDataSource<any>;
  constructor(
    private store: Store<FromApp.AppState>,
    private router: Router) {}
   ngOnInit() {
    const table: Table[] = [];
    this.store.select('customers').subscribe( customers => {
        for (const customer of customers.customers) {
          table.push({customer , index: this.i});
          this.i += 1;
        }
     });
    this.dataSource = new MatTableDataSource(table);
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OnOrder(index: number) {
    this.router.navigate(['/customers', index]);
  }
}
