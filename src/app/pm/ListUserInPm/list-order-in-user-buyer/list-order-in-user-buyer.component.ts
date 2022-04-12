import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../service/token.service';
import {Orders} from '../../../model/orders';
import {User} from '../../../model/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-order-in-user-buyer',
  templateUrl: './list-order-in-user-buyer.component.html',
  styleUrls: ['./list-order-in-user-buyer.component.scss']
})
export class ListOrderInUserBuyerComponent implements OnInit {
  id : number;
  constructor(private http : HttpClient,private tokenService: TokenService,private routerActive : ActivatedRoute) {
    this.routerActive.paramMap.subscribe((param)=>{
      this.id = Number(<string>param.get('id'));
      this.getListUserInPm()
    })
  }

  listOrder : Orders[] = [];



  ngOnInit(): void {
  }

  getListUserInPm(){
    this.http.get<Orders[]>("http://localhost:8080/orderInPm/listOrderUserInPm/" +this.tokenService.getUserNameKey()+"?id=" + this.id).subscribe((data)=>{
      this.listOrder = data;
    })
  }

}
