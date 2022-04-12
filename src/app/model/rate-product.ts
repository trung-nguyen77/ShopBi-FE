import {Orders} from './orders';
import {Product} from './product';
import {Rate} from './rate';

export class RateProduct {
 id : number;

  orders :Orders;

  product :Product;

 rate :Rate;


  constructor( orders: Orders, product: Product, rate: Rate) {
    this.orders = orders;
    this.product = product;
    this.rate = rate;
  }
}
