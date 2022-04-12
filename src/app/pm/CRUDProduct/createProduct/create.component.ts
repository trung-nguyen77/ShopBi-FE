import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../model/product';
import {Router} from '@angular/router';
import {Category} from '../../../model/category';
import {Promotion} from '../../../model/promotion';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ImgForm} from '../../../model/ImgForm';
import {User} from '../../../model/user';
import {TokenService} from '../../../service/token.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('uploadFile',{static : true}) public avatarDom:ElementRef | undefined;
  @ViewChild('uploadFileChild',{static : true}) public avatarDomChild:ElementRef | undefined;
  selectedImage : any = null;
  selectedImage2 : any = null;

  arrayPicture = "";
  arrayPictureChild = [];

  checkUpload = false;

  constructor(private http : HttpClient,private tokenService:TokenService,private router : Router,private storage : AngularFireStorage,private tokenservice: TokenService) {

    this.getListCategory()
    this.getListPromotion()
  }
  imgForm :ImgForm;
  formCreate : FormGroup;
  categoryList : Category[] = [];
  promotionList : Promotion[] = [];


  ngOnInit(): void {
    this.formCreate = new FormGroup({
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

  create(){
    this.formCreate.value.coverPhoto = this.arrayPicture;
    this.http.post<Product>("http://localhost:8080/pm?username="+this.tokenservice.getUserNameKey(), this.formCreate.value).subscribe((data)=>{
      console.log(data);
      this.imgForm = new ImgForm(this.arrayPictureChild,data);
      this.http.post<ImgForm>("http://localhost:8080/img",this.imgForm).subscribe((data)=>{
        console.log(data);
      })
    })



    this.router.navigate(["/pm/listProduct"]).then(
      window.location.reload
    )
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



  createImgChild(){
    console.log("vào đây k");
    this.formCreate.value.coverPhoto = this.arrayPicture;
    this.http.post<Product>("http://localhost:8080/pm", this.formCreate.value).subscribe((data)=>{
      console.log(data);
    })
    this.router.navigate(["/pm/listProduct"])
  }


}
