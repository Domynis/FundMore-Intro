import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss'
})
export class OrderUpdateComponent {
  orderId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  updateForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    var order = this.orderService.getOrderByID(this.orderId);
    if(order === undefined) {
      return;
    }
    this.updateForm.patchValue({
      name: order.name,
      price: order.price
    });
  }

  submitUpdate() {
    this.orderService.updateOrder({
      id: this.orderId,
      name: this.updateForm.value.name ?? '',
      price: this.updateForm.value.price ?? 0
    });

    this.updateForm.reset();
    this.router.navigate(['/orders']);
  }

  get name() {
    return this.updateForm.get('name');
  }

  get price() {
    return this.updateForm.get('price');
  }
}
