import {User} from './user';
import {Rate} from './rate';

export class Orders {
   id! : number;
  address_ship: string;
    totalBill : number;
    status: string;
   userBuyer:User;
   userPm :User;
  rate : Rate;
  createAt:Date;
  modifyAt:Date;


  constructor( address_ship: string, totalBill: number, status: string, userBuyer:User, userPm :User) {
    this.address_ship = address_ship;
    this.totalBill = totalBill;
    this.status = status;
    this.userBuyer = userBuyer;
    this.userPm = userPm;
  }

}
