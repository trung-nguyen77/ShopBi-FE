import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {data} from 'jquery';
import {Roles} from '../../model/roles';
import {isFakeMousedownFromScreenReader} from '@angular/cdk/a11y';

@Component({
  selector: 'app-show-list-user',
  templateUrl: './show-list-user.component.html',
  styleUrls: ['./show-list-user.component.scss']
})
export class ShowListUserComponent implements OnInit {
  listUser:User[] =[]
  emailFind ='';
  page:number = 0;
  totalPages : number = 1
  constructor(private  http:HttpClient) {
    this.getListUser(0)
  }

  nextPage():void{
    this.page++
    this.getListUser(this.page)
    if(this.page > this.totalPages-1){
      this.page = this.totalPages-1
      console.log('page')
      console.log(this.page)
      this.getListUser(this.page)
    }

  }
  backPage():void{

    if(this.page >0){
      this.page --;
      this.getListUser(this.page)
      console.log(this.page)
    }

  }

  ngOnInit(): void {
  }
  getListUser(page:number){
    this.http.get("http://localhost:8080/admin/listUser?pageNumber="+page).subscribe((data)=>{
      this.listUser = data['content']
      this.totalPages = data['totalPages']
      console.log(this.listUser);
    })
  }
    checkRole(user:User){
   let  flag = false;
      for (let i = 0; i <user.roles.length ; i++) {
          if (user.roles[i].id ===2 || user.roles[i].id ===3){
            flag = true
          }
      }
      return flag;
    }

  upToPm(id:number){
    if (confirm("Bạn có chắc chắn không ?")){
      this.http.get("http://localhost:8080/admin/upToPm/"+id).subscribe((data)=>{
        console.log(data);
        this.getListUser(this.page)
      })
    }
  }
  downToUser(id:number){
    if (confirm("Bạn có chắc chắn không ?")){
      this.http.get("http://localhost:8080/admin/downToUser/"+id).subscribe((data)=>{
        console.log(data);
        this.getListUser(this.page)
      })
    }
  }
  findByEmail(){
    console.log(this.emailFind);
    this.http.get<User[]>("http://localhost:8080/admin/findByEmail?email="+this.emailFind).subscribe((data)=>{
      this.listUser = data

    })
  }

  checkroleUser(user:User){
    let  flag = false;
    for (let i = 0; i <user.roles.length ; i++) {
      if (user.roles[i].id ===2 ){
        flag = true
      }
    }
    return flag;
  }


}
