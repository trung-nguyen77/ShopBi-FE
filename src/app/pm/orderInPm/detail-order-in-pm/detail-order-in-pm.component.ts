import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {OrderDetail} from '../../../model/order-detail';

@Component({
  selector: 'app-detail-order-in-pm',
  templateUrl: './detail-order-in-pm.component.html',
  styleUrls: ['./detail-order-in-pm.component.scss']
})
export class DetailOrderInPmComponent implements OnInit {
  listOrderDetail:OrderDetail[] = []
  id!:number
  constructor(private http:HttpClient,private activeRouter:ActivatedRoute) {
    this.activeRouter.paramMap.subscribe((param)=>{
      this.id =  Number(<string>param.get('orderId'))
      this.getListOrderDetail()
    })

  }

  ngOnInit(): void {
  }
  getListOrderDetail(){
    this.http.get<OrderDetail[]>("http://localhost:8080/orderInPm/detailOrderInPm/"+this.id).subscribe((data)=>{
      this.listOrderDetail = data
      console.log("listOrderDetail",this.listOrderDetail);
    })
  }


}
