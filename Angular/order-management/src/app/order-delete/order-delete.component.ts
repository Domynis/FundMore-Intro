import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-delete',
  standalone: true,
  imports: [],
  templateUrl: './order-delete.component.html',
  styleUrl: './order-delete.component.scss'
})
export class OrderDeleteComponent {
  orderId: number = 0;
  order: Order | undefined;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });
    this.order = this.orderService.getOrderByID(this.orderId);
  }

  confirmDelete() {
    this.orderService.deleteOrder(this.orderId);
    this.closeDeleteComp();
  }

  closeDeleteComp() {
    this.router.navigate(['/orders']);
  }
}
