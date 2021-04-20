import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class CustomerService {
  cardView = true;
  listView = false;
  GetCardView() {
    return this.cardView;
  }
  GetListView() {
    return this.listView;
  }
  SetCardView(cardView: boolean) {
    this.cardView = cardView;
  }
  SetListView(listView: boolean) {
    this.listView = listView;
  }
}
