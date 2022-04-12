import {Category} from './category';
import {User} from './user';
import {Promotion} from './promotion';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  quantitySale: number; // so luong sp da ban
  quantityMax: number;// so luong toi da co the ban
  quantityMin: number;// so luong toi thieu co the ban
  priceSale: number;// gia sau khuyen mai
  coverPhoto: string;

  category: Category;

  user: User;
  createAt:Date;
  modifyAt:Date;
  promotion: Promotion;


  constructor(id: number, name: string, description: string, price: number, quantity: number, quantitySale: number, quantityMax: number, quantityMin: number, priceSale: number, coverPhoto: string, category: Category, user: User, promotion: Promotion) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.quantitySale = quantitySale;
    this.quantityMax = quantityMax;
    this.quantityMin = quantityMin;
    this.priceSale = priceSale;
    this.coverPhoto = coverPhoto;
    this.category = category;
    this.user = user;
    this.promotion = promotion;

  }


}
