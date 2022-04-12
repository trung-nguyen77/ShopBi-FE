import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Img} from '../../model/img';
import {TokenService} from '../../service/token.service';
import {CartDetail} from '../../model/cart-detail';
import {Category} from '../../model/category';

import {Promotion} from '../../model/promotion';
import {User} from '../../model/user';
import {data} from 'jquery';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,AfterViewInit {
  checkLogin= false;
  username:string;
  @ViewChild("productImages") productImages:ElementRef;
  @ViewChild("productImageSlide") productImageSlide:ElementRef;
  rates = [1,2,3,4,5];
  quantityProductNow:number;
  cart = this.tokenService.getCard();
  cartDetails=this.tokenService.getListCardDetail();
  top15ProductsalePm:Product[];
  checkTop15ProductsalePm= false;
  findByPmAndCate:Product[];
  checkFindByPmAndCate = false;
  idProduct:any;
  rateAvgPm :number;
  product =  new Product(0,"","",0,0,0,0,0,0,"",
    new Category(0,"",""), new User(0,"","","","","","","",0,[]),
    new Promotion(0,"",0));
  imgList:Img[];
  listComment:Comment[] = []
  constructor(private productService: ProductService,private router:ActivatedRoute,private tokenService:TokenService,private http:HttpClient,private router1:Router) { }
  userOnline:User =  new User(0,"","","","","","","",0,[])
  contentComment :string ='';
  ngOnInit(): void {
    if(this.tokenService.getUserNameKey()!= null){
      this.checkLogin = true;
      this.username = this.tokenService.getUserNameKey();
      console.log("this.checkLogin,this.username");
      console.log(!this.checkLogin == true && this.username == "Anhdenday");
    }

    this.tokenService.idProductCurrent.subscribe((idProduct)=>{
      this.idProduct = idProduct;
      this.getProductById();
      this.getImgProductById();
      this.getListComment()
      this.getUserByUserName()
    })



    console.log("ListComment",this.listComment);
    console.log("User",this.userOnline);
    console.log("user name",this.tokenService.getUserNameKey());
  }
  public getProductById():void{
    this.productService.getProductByID(this.idProduct).subscribe((response)=>{
        this.product = response;
        this.quantityProductNow = this.product.quantity;
        this.getAvgPmRate(this.product.user.id);
        let cartDetailList = this.tokenService.getListCardDetail();
        console.log("cartDetailList");
        console.log(cartDetailList);
        if(cartDetailList!==null){
          for (const listCardDetailElement of cartDetailList) {
            if(listCardDetailElement.product.id== this.product.id){
              if(this.quantityProductNow<listCardDetailElement.quantity){
                this.quantityProductNow=0;
                listCardDetailElement.quantity = this.product.quantityMax;
                this.tokenService.setListCardDetail(cartDetailList);
              }else {
                this.quantityProductNow = this.quantityProductNow-listCardDetailElement.quantity;
              }

            }
          }
        }
        this.productImageSlide.nativeElement.style.backgroundImage = `url('${this.product.coverPhoto}')`
        this.productService.getTop15ProductsalePm(this.product.user.id).subscribe(
          (data) => {
            this.top15ProductsalePm = data;
            this.checkTop15ProductsalePm = true;
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
      this.productService.findByPmAndCate(this.product.user.id,this.product.category.id).subscribe(
        (data) => {
          this.findByPmAndCate = data;
          this.checkFindByPmAndCate = true;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }

      )
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      })
  }
  public getImgProductById():void{
    this.productService.getImgsByProductId(this.idProduct).subscribe((response)=>{
        this.imgList = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      })

  }
  public addToCart(product:Product){
    let flag = true;

    if(this.cartDetails!==null){
      console.log(this.cartDetails)
      for (let i = 0; i < this.cartDetails.length; i++) {
        if(product.id == this.cartDetails[i].product.id && this.quantityProductNow>0){
          this.quantityProductNow --;
          this.cartDetails[i].quantity += 1;
          flag = false;
        }
      }
    }
    if(flag && this.quantityProductNow>0){
      if(this.cartDetails == null){
        this.cartDetails = [];
        this.cartDetails.push(new CartDetail(this.cart,product,1))
      }else {
        this.cartDetails.push(new CartDetail(this.cart,product,1))
      }
      this.quantityProductNow--;
    }
    this.tokenService.setListCardDetail(this.cartDetails);
    this.tokenService.changeQuantityCart(this.tokenService.getQuantityCartProduct());
  }
  showPicture(img:string){
        this.productImageSlide.nativeElement.style.backgroundImage = `url('${img}')`; // setting up image slider's background image
  }
  ngAfterViewInit(): void {
  }

    getListComment(){
      this.http.get<Comment[]>("http://localhost:8080/comment/"+this.idProduct).subscribe((data)=>{
        this.listComment = data;
      })
    }
    getUserByUserName(){
    this.http.get<User>("http://localhost:8080/comment/user/"+this.tokenService.getUserNameKey()).subscribe((data)=>{
        this.userOnline = data;
    })
    }

    saveComment(){
    if (confirm("Bạn có chắc chắn không ?")){
      let  comment = new Comment(this.contentComment,this.userOnline,this.product)
      this.http.post("http://localhost:8080/comment",comment).subscribe((data)=>{
        this.getListComment()
      })
    }

    }

  goProduct(product: Product) {
    // @ts-ignore
    this.tokenService.changeProductDetail(product.id);
    this.router1.navigate(["showProductDetail"]).then()
  }

  getAvgPmRate(id :any){
    this.productService.avgPmRate(id).subscribe(
      (data)=>{
        this.rateAvgPm = Math.round(data);
      },
    (error:HttpErrorResponse)=>{
      console.log(error);
    }
    )
  }

  showProductsByPm(id:number) {
    this.tokenService.changePMId(id);
    this.router1.navigate(["/index/ShowProductPmComponent"]).then()
  }

  login() {
    this.router1.navigate(["/login"]).then(
      window.location.reload
    )
  }
}
