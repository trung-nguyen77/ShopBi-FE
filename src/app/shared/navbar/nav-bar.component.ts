import {AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {TokenService} from '../../service/token.service';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit,AfterViewInit{
  @ViewChild("search") search:ElementRef;
  quantityCart :any = 0;
  categories:Category[];
  name: any;
  isCheckLogin = false;
  avatar: any;
  checkPM = true;
  constructor(private tokenService: TokenService,private productService:ProductService,private categoryService: CategoryService, private router: Router) {
  }
  ngOnInit(): void {
    if(this.tokenService.getTokenKey()){
      this.isCheckLogin = true;
      this.name = this.tokenService.getNameKey();
      this.avatar = this.tokenService.getAvatarKey();
     this.tokenService.currentQuantityCart.subscribe((quantityCart)=>{
       this.quantityCart = quantityCart;
       console.log("quantityCart");
       console.log(quantityCart);
       for (const argument of this.tokenService.getRoleKey()) {
         if(argument == "PM" || argument == "ADMIN"){
           this.checkPM = false;
         }
       }
     })
    }
    this.getCategories();
    // this.narbarOption();
  }


  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('data');
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  logOut() {
    if(confirm("Are you sign out ?")){
      console.log("this.tokenService.cart.getId");
      console.log(this.tokenService.cart);
      let idCart = this.tokenService.cart.getId();
      this.productService.deleteCartDetail(idCart).subscribe((data)=>{
          console.log(data);
        let cartDetails = this.tokenService.getListCardDetail();
        for (const cartDetail of cartDetails) {
          this.productService.saveCartDetail(cartDetail).subscribe((data)=>{
              console.log(data);
            },
            (error:HttpErrorResponse) => {
              console.log(error);
            }
          )
        }
          window.sessionStorage.clear();
          this.router.navigate(['login']).then(() => {
            window.location.reload();
          })
        },
        (error:HttpErrorResponse) => {
          console.log(error);
        }
      )

      ;
    }
  }

  showProductsByCategory(id:number) {
    this.tokenService.changeCategoryId(id);
    this.router.navigate(["showProductByCategory"]).then()
  }




  // narbarOption(){
  //   const userImageButton = document.querySelector('#user-img');
  //   const userPopup = document.querySelector('.login-logout-popup');
  //   const popuptext = document.querySelector('.account-info');
  //   const actionBtn = document.querySelector('#user-btn');
  //   const actionBtn2 = document.querySelector('#user-btn2');
  //
  //   userImageButton.addEventListener('click', () => {
  //     userPopup.classList.toggle('hide');
  //   })
  //
  //   window.onload = () => {
  //     let user = this.tokenService.getNameKey();
  //     if(user != null){
  //       this.isCheckLogin = true;
  //       // means user is logged in
  //       popuptext.innerHTML = `log in as, ${user}`;
  //       actionBtn.innerHTML = 'log out';
  //       actionBtn.addEventListener('click', () => {
  //         this.logOut();
  //       })
  //       actionBtn2.addEventListener('click', () => {
  //         this.router.navigate(["user/showOrders"]).then(() => {
  //           window.location.reload();
  //         })
  //       })
  //     } else{
  //       // user is logged out
  //       popuptext.innerHTML = 'log in to place order';
  //       actionBtn.innerHTML = 'log in';
  //       actionBtn.addEventListener('click', () => {
  //         this.router.navigate(['login']).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //     }
  //   }
  // }

  searchProduct() {
    this.tokenService.changeSearch(this.search.nativeElement.value)
    this.router.navigate(['index/showOrders']).then();
  }

  ngAfterViewInit(): void {
  }

}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
    MatIconModule,
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {}
