
import {Product} from './product';

export class OrderDetail {
     product :Product;
      quantity: number;
  constructor( product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
