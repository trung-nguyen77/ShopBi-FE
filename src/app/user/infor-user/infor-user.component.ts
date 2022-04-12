import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {ProductService} from '../../service/product.service';
import {TokenService} from '../../service/token.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-infor-user',
  templateUrl: './infor-user.component.html',
  styleUrls: ['./infor-user.component.scss']
})
export class InforUserComponent implements OnInit,AfterViewInit {
  checkUP1Hit = true
  public userEdit: User;
  user:User;
  checkload = false;
  checkUploadFile = true;
  public fb: string = "";
  downloadURL: Observable<string>;
  constructor(private productService:ProductService,private tokenService:TokenService,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    for (const argument of this.tokenService.getRoleKey()) {
      if(argument == "PM" || argument == "ADMIN"){
        this.checkUP1Hit = false;
      }
    }

    console.log(this.tokenService.getAvatarKey());
    this.getUserName()
  }
  getUserName(){
    this.productService.findUserByUserName(this.tokenService.getUserNameKey().toLowerCase()).subscribe(
      (response)=>{
        this.user = response;
        console.log("response");
        console.log(response);
        this.checkload = true
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }



  ngAfterViewInit(): void {
  }

  public onUpdateUser(user: User ,userEdit: User): void {
    this.tokenService.setAvatarKey(user.avatar);
    userEdit.name = user.name;
    userEdit.avatar = user.avatar;
    userEdit.nameStore = user.nameStore;
    userEdit.address = user.address;
    userEdit.phone = user.phone;
    if(this.fb != ""){
      userEdit.avatar = this.fb
    }
    console.log("userEdit");
    console.log(userEdit);
    this.productService.updateUser(userEdit).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onFileSelected(event:any) {
    this.checkUploadFile = false;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.checkUploadFile = true;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  openModal(user: User) {
    this.userEdit = user;
  }

  sumitPm(user: User ,userEdit: User) {
    userEdit.name = user.name;
    userEdit.avatar = user.avatar;
    userEdit.nameStore = user.nameStore;
    userEdit.address = user.address;
    this.productService.sendRequestUpSaller(userEdit).subscribe(
      (response: User) => {
        alert("response");
        this.checkUP1Hit = false
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
