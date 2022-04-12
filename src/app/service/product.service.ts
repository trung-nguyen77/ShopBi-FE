import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment.prod';
import {RateProduct} from '../model/rate-product';
import {User} from '../model/user';
import {CartDetail} from '../model/cart-detail';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apilocal = environment.API_LOCAL;

  constructor(private httpClient: HttpClient) {
  }

  // @ts-ignore
  public getProductByID(idProduct: number): Observable<Product> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/detail/' + idProduct);
  }
  // @ts-ignore
  public getProductsByCategoryOrderByQuantitySale(idCateogory: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/category/' + idCateogory);
  }
  // @ts-ignore
  public getProductsByPM(idPm: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/pm/' + idPm);
  }

  // @ts-ignore
  public getProductsBestSeller(): Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/bestSale');
  }
  // @ts-ignore
  public getProductsBestSeller(): Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/bestSale');
  }
  public getProductsBestSellerPT(page:number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/bestSale?pageNumber='+page);
  }
  public getImgsByProductId(idProduct:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'pm/img/'+idProduct);
  }

  public getCartDetailsByCartId(idCart:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/cartdetail/'+idCart);
  }
  public getProductNew():Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/new10Product');
  }

  public getTop15ProductsalePm(idPm:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/Top15ProductsalePm/'+idPm);
  }
  public findByPmAndCate(idU:any,idC:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/findByPmAndCate/'+idU +"?idC="+idC);
  }

  public findUserByUserName(username:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/findUserByUserName/'+username);
  }

  public avgPmRate(id:any):Observable<any> {
    // @ts-ignore
    return this.httpClient.get(this.apilocal + 'index/avgPmRate/'+id);
  }
  public updateUser(user:User):Observable<User>{
    return this.httpClient.put<User>(this.apilocal+"index/userEdit", user);
  }

  public sendRequestUpSaller(user:User):Observable<User>{
    return this.httpClient.post<User>(this.apilocal+"index/sendRequestUpSaller", user);
  }
  public saveCartDetail(cartDetail:CartDetail):Observable<CartDetail>{
    return this.httpClient.post<CartDetail>(this.apilocal+"index/saveCartDetail", cartDetail);
  }
  public deleteCartDetail(idCart:any):Observable<any>{
    return this.httpClient.delete<any>(this.apilocal+"index/deleteCartDetail/" +idCart, null);
  }



}
