import {Product} from './product';

export class ImgForm{
  imgList:string[];
  product:Product;

  constructor(imgList: string[], product: Product) {
    this.imgList = imgList;
    this.product = product;
  }
}
