import {Cart} from './cart';
import {Product} from './product';

export class CartDetail {
   id! : number;
   cart : Cart;
  product : Product;
  quantity! : number;


  constructor( cart: Cart, product: Product, quantity: number) {
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
  }

}
