import { Pipe , PipeTransform} from '@angular/core';
import { Customer } from '../customer.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(customers: Customer[], searchText: string): Customer[] {
    if (!customers || !searchText) {
      return customers;
    }
    return customers.filter( customer => {
      if (customer.firstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      || customer.lastName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        return customer; }
    });
  }
}
