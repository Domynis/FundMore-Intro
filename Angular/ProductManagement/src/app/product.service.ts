import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Apple', price: 100 },
    { id: 2, name: 'Banana', price: 200 },
    { id: 3, name: 'Cherry', price: 300 },
    { id: 4, name: 'Date', price: 400 },
    { id: 5, name: 'Elderberry', price: 500 }
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    product = { ...product };
    product.id = this.products.length + 1;
    this.products.push(product);
  }
}
