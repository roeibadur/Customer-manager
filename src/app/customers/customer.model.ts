import { Item } from '../shared/item.model';

export class Customer {
  public _id?: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public country: string;
  public orders: Item [];
  public imagePath: string;
  public orderTotal: number;

  constructor(firstName: string , lastName: string , city: string , country: string , orders: Item [] , imagepath: string , orderTotal: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.country = country;
    this.orders = orders;
    this.imagePath = imagepath;
    this.orderTotal = orderTotal;
  }
}
