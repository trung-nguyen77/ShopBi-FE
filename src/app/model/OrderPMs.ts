import {CartDetail} from './cart-detail';
import {User} from './user';

export class OrderPMs{
  cartDetails:CartDetail[];
  usernameSaler:string;
  billTotal:number;
  address_ship:string;
  usernameBuyer:string;
  constructor(cartDetails: CartDetail[], usernameSaler: string ,billTotal:number,address_ship:string, usernameBuyer:string) {
    this.cartDetails = cartDetails;
    this.usernameSaler = usernameSaler;
    this.billTotal = billTotal;
    this.address_ship = address_ship;
    this.usernameBuyer = usernameBuyer;
  }
}
