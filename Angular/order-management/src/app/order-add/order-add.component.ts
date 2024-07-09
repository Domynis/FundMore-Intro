import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss'
})
export class OrderAddComponent {
  constructor(private formBuilder: FormBuilder, private orderService: OrderService) { }

  addForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(1)]]
  });

  submitAdd() {
    this.orderService.submitAdd(
      this.addForm.value.name ?? '',
      this.addForm.value.price ?? 0
    );

    this.addForm.reset();
  }

  get name() {
    return this.addForm.get('name');
  }

  get price() {
    return this.addForm.get('price');
  }
}
