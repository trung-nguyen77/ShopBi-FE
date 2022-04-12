import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {Promotion} from '../../../model/promotion';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id! : number;
  formEdit! : FormGroup;
  checkUpload = false;
  categoryList : Category[] = [];
  promotionList : Promotion[] = [];

  @ViewChild('uploadFile',{static : true}) public avatarDom:ElementRef | undefined;

  selectedImage : any = null;

  arrayPicture = "";

  constructor(private http: HttpClient,private tokenService:TokenService, private routerActive : ActivatedRoute, private router : Router,private storage : AngularFireStorage,private tokenservice: TokenService) {
    this.routerActive.paramMap.subscribe((param)=>{
      this.id = Number(<string>param.get('id'));
    })
    this.showFormEdit()
    this.getListCategory()
    this.getListPromotion()
  }

  getListCategory(){
    this.http.get<Category[]>("http://localhost:8080/pm/category").subscribe((data)=>{
      this.categoryList = data;
    })
  }

  getListPromotion(){
    this.http.get<Promotion[]>("http://localhost:8080/pm/promotion").subscribe((data)=>{
      this.promotionList = data;
    })
  }

  ngOnInit(): void {
    this.formEdit = new FormGroup({
      id: new FormControl(),
      name: new FormControl("", Validators.minLength(6)),
      description: new FormControl( "",Validators.minLength(6)),
      price: new FormControl(0,Validators.pattern("^[0-9]+$")),
      quantity: new FormControl(0,Validators.pattern("^[0-9]+$")),
      quantitySale: new FormControl(0,Validators.pattern("^[0-9]+$")),
      quantityMax: new FormControl(0,Validators.pattern("^[0-9]+$")),
      quantityMin: new FormControl(0,Validators.pattern("^[0-9]+$")),
      priceSale: new FormControl(0,Validators.pattern("^[0-9]+$")),
      coverPhoto: new FormControl("",Validators.minLength(6)),
      category: new FormControl(),
      promotion: new FormControl()
    })
  }

  showFormEdit(){
    this.http.get<Product>("http://localhost:8080/pm/" + this.id).subscribe((data)=>{
      this.formEdit = new FormGroup({
        name: new FormControl(data.name),
        id: new FormControl(data.id),
        description: new FormControl(data.description),
        price: new FormControl(data.price),
        quantity: new FormControl(data.quantity),
        quantitySale: new FormControl(data.quantitySale),
        quantityMax: new FormControl(data.quantityMax),
        quantityMin: new FormControl(data.quantityMin),
        priceSale: new FormControl(data.priceSale),
        coverPhoto: new FormControl(data.coverPhoto),
        category: new FormControl(data.category),
        promotion: new FormControl(data.promotion)
      })
      this.arrayPicture = data.coverPhoto
      console.log("vao show editProduct",this.formEdit.value)

    })
  }

  edit(){
    console.log("vao editProduct",this.formEdit.value)
    this.formEdit.value.coverPhoto = this.arrayPicture;
    this.http.put<Product>("http://localhost:8080/pm?username="+this.tokenservice.getUserNameKey() , this.formEdit.value).subscribe((data)=>{
      console.log("data", data);
      console.log("hdhdhdh");
      console.log(this.id)

    })
    this.router.navigate(["/pm/listProduct"])
  }

  submit(){
    this.checkUpload = true;
    if (this.selectedImage != null){
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>(fileRef.getDownloadURL().subscribe(url =>{
          this.arrayPicture = url;
          this.checkUpload=false;
          console.log(url);
        })))
      ).subscribe()
    }
  }

  uploadFileIMG(){
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit()

  }

}
