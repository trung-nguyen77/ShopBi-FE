import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../../../model/orders';
import {data} from 'jquery';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-order-in-pm',
  templateUrl: './order-in-pm.component.html',
  styleUrls: ['./order-in-pm.component.scss']
})
export class OrderInPmComponent implements OnInit {

  constructor(private http:HttpClient,private tokenService:TokenService) {
    this.getListOrder()
  }
  status:string = 'Pending'
  orderList:Orders[] = []
  emailFind ='';
  ngOnInit(): void {
  }

  getListOrder(){
    this.http.get<Orders[]>("http://localhost:8080/orderInPm/listOrder/"+this.tokenService.getUserNameKey()).subscribe((data)=>{
      this.orderList= data
    })
  }
  checkkedOrder(id:number){
    if (confirm("Bán có chắc chắn không ?")){
      this.http.get("http://localhost:8080/orderInPm/checkkedOrder/"+id).subscribe((data)=>{
        this.getListOrder()
      })
    }

  }

  unCheckkedOrder(id:number){
    if (confirm("Bán có chắc chắn không ?")){
      this.http.get("http://localhost:8080/orderInPm/unCheckkedOrder/"+id).subscribe((data)=>{
        this.getListOrder()
      })
    }
  }
  searchByEmail(){
    this.http.get<Orders[]>("http://localhost:8080/orderInPm/searchByEmail/"+this.tokenService.getUserNameKey()+"?emailFind="+this.emailFind).subscribe((data)=>{
        this.orderList = data;
      console.log("list " , this.orderList);
    })
  }

  checkDone(id:number){
    if (confirm("Bán có chắc chắn không ?")){
      this.http.get("http://localhost:8080/orderInPm/checkDone/"+id).subscribe((data)=>{
        this.getListOrder()
      })
    }
  }
}
