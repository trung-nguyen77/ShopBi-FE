import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product';
import {identity} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-listproductcategory',
  templateUrl: './listproductcategory.component.html',
  styleUrls: ['./listproductcategory.component.scss']
})
export class ListproductcategoryComponent implements OnInit {
  idCategory :any;
  products:Product[];
  constructor(private productService:ProductService, private router:ActivatedRoute,private  http:HttpClient,private router1:Router,private tokenService:TokenService) { }

  ngOnInit(): void {

    this.tokenService.idCategoryCurrent.subscribe((idCategory)=>{
      this.idCategory = idCategory;
      this.getListProductByCategoryID(0);
    })

  }

  // public getProducts():void{
  //   this.productService.getProductsByCategoryOrderByQuantitySale(this.idCategory).subscribe((response)=>{
  //       this.products = response.content;
  //       console.log(this.products);
  //     },
  //     (error:HttpErrorResponse)=>{
  //       alert(error.message);
  //     })
  // }

  page:number = 0;
  totalPages : number = 1
  nextPage():void{
    this.page++
    this.getListProductByCategoryID(this.page)
    if(this.page > this.totalPages-1){
      this.page = this.totalPages-1
      console.log('page')
      console.log(this.page)
      this.getListProductByCategoryID(this.page)
    }

  }
  backPage():void{

    if(this.page >0){
      this.page --;
      this.getListProductByCategoryID(this.page)
      console.log(this.page)
    }

  }

  getListProductByCategoryID(page:number){
    let api = "http://localhost:8080/index/category/" + this.idCategory +"?pageNumber=" +page
    this.http.get(api).subscribe((data)=>{
      this.products = data['content']
      this.totalPages = data['totalPages']
      console.log(this.products);
    })
  }

  showProductDetail(id: number) {
    this.tokenService.changeProductDetail(id);
    this.router1.navigate(["showProductDetail"]).then()
  }

}
