import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {Promotion} from '../../../model/promotion';
import {User} from '../../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Img} from '../../../model/img';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product = new Product(0,"","",0,0,0,0,0,0,"",
    new Category(0,"",""), new User(0,"","","","","","","",0,[]),
    new Promotion(0,"",0));

  user = new User(0,"","","","","","","",0,[]);

  listImg : Img[] = []

  id! : number;

  selectedImage : any = null;

  arrayPicture = [];

  @ViewChild('uploadFile',{static : true}) public avatarDom:ElementRef | undefined;

  constructor(private routerActive : ActivatedRoute,private tokenService:TokenService, private http : HttpClient,private router : Router,private storage : AngularFireStorage) {
      this.routerActive.paramMap.subscribe((param)=>{
        this.id = Number(<string>param.get('id'));
        this.detailProduct();
        this.getListImg();
      })
  }

  ngOnInit(): void {

  }

  getListImg(){
    this.http.get<Img[]>("http://localhost:8080/pm/img/" + this.id).subscribe((data)=>{
      this.listImg = data
      console.log( "this.listImg");
      console.log( this.listImg);
    })
  }

  detailProduct(){
    this.http.get<Product>("http://localhost:8080/pm/" + this.id).subscribe((data)=>{
      this.product = data

    })
  }





}
