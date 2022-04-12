import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/product';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../model/category';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  listProduct : Product[] = [];
  listCategory : Category[] = [];
  idCate:number;


  constructor(private http: HttpClient,private router : Router,private active: ActivatedRoute,private tokenService:TokenService) {
    this.getListProduct()
    this.getListCategory()
  }

  ngOnInit(): void {

  }
  search :string ='';

  searchName(){
    this.http.get<Product[]>("http://localhost:8080/pm/find/" + this.search).subscribe((data)=>{
      this.listProduct = data
    })
  }

  searchCategory(id:any){
    this.http.get<Product[]>("http://localhost:8080/pm/find/category/" +id).subscribe((data)=>{
      this.listProduct = data
      console.log(this.listProduct);
    })
  }

  getListCategory(){
    this.http.get<Category[]>("http://localhost:8080/pm/category").subscribe((data)=>{
      this.listCategory = data;
    })
  }


  getListProduct(){
    this.http.get<Product[]>("http://localhost:8080/pm/product/"+ this.tokenService.getUserNameKey()).subscribe((data)=>{
      this.listProduct = data;
    })
  }

  delete(id : number){
    this.http.delete("http://localhost:8080/pm/" + id).subscribe((data)=>{
      this.getListProduct()
    })
  }



}
