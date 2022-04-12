import {User} from './user';
import {Product} from './product';

export class Comment {

  content:string
  userComment:User
  product:Product

  constructor( content: string, userComment: User, product: Product) {
    this.content = content;
    this.userComment = userComment;
    this.product = product;
  }

}
