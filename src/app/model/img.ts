import {Product} from './product';

export class Img {
   id! : number;
  link! : string;

   product : Product;

  constructor(id: number, link: string, product: Product) {
    this.id = id;
    this.link = link;
    this.product = product;
  }
}
