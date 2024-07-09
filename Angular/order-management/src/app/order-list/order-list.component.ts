import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  constructor(private orderService: OrderService) { }
  public orderList : Order[] = [];

  ngOnInit() {
    this.orderList = this.orderService.getOrders();
  }
}