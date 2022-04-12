import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {
  nameSearch:any;
  products:Product[];
  constructor(private productService:ProductService, private router:ActivatedRoute,private  http:HttpClient,private tokenService:TokenService,private router1:Router) { }

  ngOnInit(): void {
    this.tokenService.searchNow.subscribe((nameSearch)=>{
      this.nameSearch = nameSearch;
      console.log("nameSearch");
      console.log(nameSearch);
      this.getListProductByName(0);
    });

  }
  page:number = 0;
  totalPages : number = 1
  nextPage():void{
    this.page++
    this.getListProductByName(this.page)
    if(this.page > this.totalPages-1){
      this.page = this.totalPages-1
      console.log('page')
      console.log(this.page)
      this.getListProductByName(this.page)
    }

  }
  backPage():void{

    if(this.page >0){
      this.page --;
      this.getListProductByName(this.page)
      console.log(this.page)
    }

  }
  showDetail(id: number) {
    this.tokenService.changeProductDetail(id);
    this.router1.navigate(["showProductDetail"]).then()
  }

  getListProductByName(page:number,){
    if(this.nameSearch!=""){
      let api = "http://localhost:8080/index/search/" + this.nameSearch +"?pageNumber=" +page
      this.http.get(api).subscribe((data)=>{
        this.products = data['content']
        this.totalPages = data['totalPages']
        console.log(this.products);
      })
    }else {
      this.productService.getProductsBestSellerPT(page).subscribe(
        (data)=>{
          this.products = data['content']
          this.totalPages = data['totalPages']
          console.log(this.products);
        }
      )

    }

  }
}
