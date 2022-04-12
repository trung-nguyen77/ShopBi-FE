import { Injectable } from '@angular/core';
import {OrderForm} from '../model/OrderForm';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {OrderPMs} from '../model/OrderPMs';
import {RateProduct} from '../model/rate-product';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private apilocal = environment.API_LOCAL;
  constructor(private http:HttpClient) { }
  public createOrder(orderPMs:OrderPMs):Observable<OrderPMs>{
    return this.http.post<OrderPMs>(this.apilocal+"index/checkOutOrder", orderPMs);
  }
  public createRateProduct(rateProduct:RateProduct):Observable<RateProduct>{
    return this.http.post<RateProduct>(this.apilocal+"index/RateOrder", rateProduct);
  }

  public getListOrderBuyer(username:any,page:any):Observable<any> {
    // @ts-ignore
    return this.http.get(this.apilocal + 'index/findOrder/'+username +"?pageNumber=" + page);
  }
  public getListOrderDetailByOrderId(id:any):Observable<any> {
    // @ts-ignore
    return this.http.get(this.apilocal + 'index/findOrderDetail/'+id);
  }
  public getRate(id:any):Observable<any> {
    // @ts-ignore
    return this.http.get(this.apilocal + 'index/findRateProduct/'+id);
  }
}
