import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/category';
import {User} from '../../../model/user';
import {TokenService} from '../../../service/token.service';
import {data} from 'jquery';

@Component({
  selector: 'app-list-user-in-pm',
  templateUrl: './list-user-in-pm.component.html',
  styleUrls: ['./list-user-in-pm.component.scss']
})
export class ListUserInPmComponent implements OnInit {

  constructor(private http : HttpClient,private tokenService: TokenService) {
    this.getListUserInPm();

  }

  ngOnInit(): void {

  }



  listUserInPm : User[] = []

  orderFind : string

  getListUserInPm(){
    this.http.get<User[]>("http://localhost:8080/orderInPm/listUserInPm/" +this.tokenService.getUserNameKey()).subscribe((data)=>{
      this.listUserInPm = data;

    })
  }

  findByEmail(){
    this.http.get<User[]>("http://localhost:8080/orderInPm/findUserInPm/"  + this.tokenService.getUserNameKey() +"?email=" + this.orderFind).subscribe((data)=>{
      this.listUserInPm = data;
    })
  }


}
