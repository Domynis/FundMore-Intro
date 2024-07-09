import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private productService: ProductService) { }

  @Input() product: Product = {
    id: 0,
    name: '',
    price: 1
  };

  addProductSubmit() {
    if (this.validateProduct(this.product)) {
      this.productService.addProduct(this.product);

      this.product = {
        id: 0,
        name: '',
        price: 1
      };
    } else {
      alert('Invalid product');
    }
  }

  validateProduct(product: Product) {
    if (product.name === '' || product.price < 1) {
      return false;
    }
    return true;
  }
}