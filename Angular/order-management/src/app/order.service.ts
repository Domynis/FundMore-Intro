import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    { id: 1, name: 'Order 1', price: 100 },
    { id: 2, name: 'Order 2', price: 200 },
    { id: 3, name: 'Order 3', price: 300 },
    { id: 4, name: 'Order 4', price: 400 },
    { id: 5, name: 'Order 5', price: 500 }
  ];
  constructor() { }

  getOrders() : Order[] {
    return this.orders;
  }

  getOrderByID(id: number) : Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  addOrder(order: Order) : void {
    order = { ...order };
    order.id = this.orders.length + 1;
    this.orders.push(order);
  }

  submitAdd(name: string, price: number) : void {
    this.addOrder({ id: 0, name, price });
  }

  deleteOrder(id: number) : void {
    this.orders = this.orders.filter(order => order.id !== id);
  }

  updateOrder(order: Order) : void {
    const index = this.orders.findIndex(o => o.id === order.id);
    this.orders[index] = order;
  }

  orderExists(id: number) : Observable<boolean> {
    const exists = this.orders.some(order => order.id === id);
    return of(exists);
  }
}
