import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../service/token.service';
import {Orders} from '../../model/orders';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {

  listOrderDone : Orders[] = [];
  constructor(private http : HttpClient, private tokenService : TokenService) {
    this.getListOrderDoneToday();
    this.getListOrderDone()
  }

  sumTotalToday : number=0;
  sumTotal : number=0;




  ngOnInit(): void {

  }

  getListOrderDoneToday(){
    this.http.get<Orders[]>("http://localhost:8080/pm/listOrderDoneToday/" + this.tokenService.getUserNameKey()).subscribe((data)=>{
      this.listOrderDone = data;
      for (let i = 0; i < this.listOrderDone.length; i++) {
        this.sumTotalToday += this.listOrderDone[i].totalBill;
        console.log(this.listOrderDone[i].totalBill);
      }
    })
  }

  getListOrderDone(){
    this.http.get<Orders[]>("http://localhost:8080/pm/listOrderDone/" + this.tokenService.getUserNameKey()).subscribe((data)=>{
      this.listOrderDone = data;
      for (let i = 0; i < this.listOrderDone.length; i++) {
        this.sumTotal += this.listOrderDone[i].totalBill;
        console.log(this.listOrderDone[i].totalBill);
      }
    })
  }

}
