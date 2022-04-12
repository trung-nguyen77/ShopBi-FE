import {Cart} from './cart';
import {CartDetail} from './cart-detail';

export class JwtResponse {
  name: string;
  username: string;
  token: string;
  roles: string[];
  avatar: string;
  address:string;
  cart:Cart;
  cartDetailList:CartDetail[];


  constructor(name: string, token: string, avatar: string, roles: string[], cart:Cart, cartDetailList:CartDetail[],username: string,address:string) {
    this.name = name;
    this.token = token;
    this.avatar = avatar;
    this.roles = roles;
    this.cart=cart;
    this.cartDetailList = cartDetailList;
    this.username = username;
    this.address = address;
  }

}
