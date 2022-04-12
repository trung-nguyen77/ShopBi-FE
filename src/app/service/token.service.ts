import {Injectable} from '@angular/core';
import {CartDetail} from '../model/cart-detail';
import {Cart} from '../model/cart';
import {BehaviorSubject} from 'rxjs';
import jwt_decode from 'jwt-decode';
const NAME_KEY = 'Name_Key';
const USER_NAME_KEY = 'User_Name_Key';
const TOKEN_KEY = 'Token_Key';
const ROLE_KEY = 'Role_Key';
const AVATAR_KEY = 'Avatar_Key';
const LIST_CART_DETAIL = 'CartDetails_Key';
const CART = 'Cart_Key';
const ADDRESS = 'ADDRESS';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  cartDetails:CartDetail[];
  private search = new BehaviorSubject('')
  searchNow = this.search.asObservable();
   private  quantityCart = new BehaviorSubject(this.getQuantityCartProduct())
  currentQuantityCart = this.quantityCart.asObservable();
  cart:Cart;
  private idProduct = new BehaviorSubject(1);
  idProductCurrent = this.idProduct.asObservable();

  constructor() {
  }
  private idPM = new BehaviorSubject(1);
  idPmCurrent = this.idPM.asObservable();

  public changePMId(idPM:number){
    this.idPM.next(idPM);
  }

  private idCategory = new BehaviorSubject(1);
  idCategoryCurrent = this.idCategory.asObservable();

  public changeCategoryId(idCategory:number){
    this.idCategory.next(idCategory);
  }
  public changeProductDetail(idProduct:number){
    this.idProduct.next(idProduct);
  }
  public changeSearch(search:string){
    this.search.next(search);
  }
  public changeQuantityCart(quantityCart:number){
    this.quantityCart.next(quantityCart);
  }
  public setNameKey(name: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }

  public getNameKey(): string {
    return window.sessionStorage.getItem(NAME_KEY);
  }
  public setUserNameKey(username: string) {
    window.sessionStorage.removeItem(USER_NAME_KEY);
    window.sessionStorage.setItem(USER_NAME_KEY, username);
  }

  public setAddressKey(address: string) {
    window.sessionStorage.removeItem(ADDRESS);
    window.sessionStorage.setItem(ADDRESS, address);
  }
  public getAddressKey(): string {
    return window.sessionStorage.getItem(ADDRESS);
  }
  public getUserNameKey(): string {
    return window.sessionStorage.getItem(USER_NAME_KEY);
  }
  public setListCardDetail(cartDetails: CartDetail[]) {
    window.sessionStorage.removeItem(LIST_CART_DETAIL);
    // @ts-ignore
    window.sessionStorage.setItem(LIST_CART_DETAIL,JSON.stringify(cartDetails));
  }

  public getListCardDetail(): any {
    return  JSON.parse(window.sessionStorage.getItem(LIST_CART_DETAIL));
  }
  public setCart(cart: Cart) {
    window.sessionStorage.removeItem(CART);
    // @ts-ignore
    window.sessionStorage.setItem(CART, JSON.stringify(cart));
  }

  public getCard(): any {
    return JSON.parse(window.sessionStorage.getItem(CART));
  }

  public getQuantityCartProduct(){
    let sum = 0 ;
    if(this.getListCardDetail()!== null){
      for (const listCardDetailElement of this.getListCardDetail()) {
        sum+=listCardDetailElement.quantity;
      }
    }
    return sum;
  }


  public setTokenKey(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public setAvatarKey(avatar: string) {
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
    console.log(window.sessionStorage.getItem(AVATAR_KEY));
  }

  public getAvatarKey(): string {
    return window.sessionStorage.getItem(AVATAR_KEY);
  }

  public getTokenKey(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setRoleKey(roles: string[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRoleKey(): string[] {
    const roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role => {
        roles.push(role.authority);
      });
    }
    return roles;
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.getTokenKey());
    } catch(Error) {
      return null;
    }
  }
}
