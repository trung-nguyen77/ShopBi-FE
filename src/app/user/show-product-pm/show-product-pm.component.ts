import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../service/token.service';
import {Product} from '../../model/product';

@Component({
  selector: 'app-show-product-pm',
  templateUrl: './show-product-pm.component.html',
  styleUrls: ['./show-product-pm.component.scss']
})
export class ShowProductPmComponent implements OnInit {
  idPM:any;
  products:Product[];
  constructor(private productService:ProductService, private router:ActivatedRoute,private  http:HttpClient,private tokenService:TokenService,private router1:Router) { }

  ngOnInit(): void {
    this.tokenService.idPmCurrent.subscribe((idPM)=>{
      this.idPM = idPM;
      console.log("idPM");
      console.log(idPM);
      this.getListProductByPMid(0);
    });

  }

  page:number = 0;
  totalPages : number = 1
  nextPage():void{
    this.page++
    this.getListProductByPMid(this.page)
    if(this.page > this.totalPages-1){
      this.page = this.totalPages-1
      console.log('page')
      console.log(this.page)
      this.getListProductByPMid(this.page)
    }

  }
  backPage():void{

    if(this.page >0){
      this.page --;
      this.getListProductByPMid(this.page)
      console.log(this.page)
    }

  }
  showDetail(id: number) {
    this.tokenService.changeProductDetail(id);
    this.router1.navigate(["showProductDetail"]).then()
  }

  getListProductByPMid(page:number){
      this.productService.getProductsByPM(this.idPM).subscribe((data)=>{
        this.products = data['content']
        this.totalPages = data['totalPages']
        console.log(this.products);
      },
        (error: HttpErrorResponse )=>{
          console.log(error);
        }
      )
  }

}
