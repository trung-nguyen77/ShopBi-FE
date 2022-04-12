import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../service/token.service';
import {ActivatedRoute} from '@angular/router';
import {Orders} from '../../../model/orders';
import {OrderDetail} from '../../../model/order-detail';

@Component({
  selector: 'app-list-order-detail-in-buyer',
  templateUrl: './list-order-detail-in-buyer.component.html',
  styleUrls: ['./list-order-detail-in-buyer.component.scss']
})
export class ListOrderDetailInBuyerComponent implements OnInit {

  id : number;
  orderDetail : OrderDetail[] = [];
  constructor(private http : HttpClient,private tokenService: TokenService,private routerActive : ActivatedRoute) {
    this.routerActive.paramMap.subscribe((param)=>{
      this.id = Number(<string>param.get('id'));
      this.getListOrderDetail()
    })
  }
  ngOnInit(): void {
  }

  getListOrderDetail(){
    this.http.get<OrderDetail[]>("http://localhost:8080/orderInPm/listOrderDetail/" + this.id).subscribe((data)=>{
      this.orderDetail = data;
    })
  }

}
