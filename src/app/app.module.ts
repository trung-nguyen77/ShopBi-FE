import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import {HomeComponent} from './pages/home/home.component';
import {GettingStartedComponent} from './pages/gettingstarted/gettingstarted.component';
import * as $ from 'jquery/dist/jquery.min.js';
import {HttpClientModule} from '@angular/common/http';
import {NgxAudioPlayerModule} from 'projects/ngx-audio-player/src/public_api';
import {MatButtonModule} from '@angular/material/button';

import {NavBarModule} from './shared/navbar';
import {FooterModule} from './shared/footer';
import {RegisterComponent} from './form_login/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './form_login/login/login.component';

import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {UploadAvatarComponent} from './upload/upload-avatar/upload-avatar.component';
import {httpInterceptorProvider} from './secuirty/auth.interceptor';
import {ChangeAvatarComponent} from './manage-profile/change-avatar/change-avatar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';

import { PmComponent } from './pm/pm/pm.component';
import { UserComponent } from './user/user/user.component';
// @ts-ignore
import {ShowListComponent} from './pm/CRUDProduct/showListProduct/show-list.component';
import { IndexComponent } from './user/index/index.component';

import {ProductService} from './service/product.service';
import {CategoryService} from './service/category.service';
// @ts-ignore
import { ListproductcategoryComponent } from './user/category/listproductcategory/listproductcategory.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
// @ts-ignore
import {EditComponent} from './pm/CRUDProduct/editProduct/edit.component';
// @ts-ignore
import { CreateComponent } from './pm/CRUDProduct/createProduct/create.component';
// @ts-ignore
import { DetailProductComponent } from './pm/CRUDProduct/detail-product/detail-product.component';
import { OrderInPmComponent } from './pm/orderInPm/order-in-pm/order-in-pm.component';
import { DetailOrderInPmComponent } from './pm/orderInPm/detail-order-in-pm/detail-order-in-pm.component';
// @ts-ignore
import { ShowCartComponent } from './user/show-cart/show-cart.component';
import {HomeAdminComponent} from './admin/home-admin/home-admin.component';
import {ShowListUserComponent} from './admin/show-list-user/show-list-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {TokenService} from './service/token.service';
import {AuthRouterGuard} from './service/auth-router.guard';
import {AuthService} from './service/auth.service';
import {AuthPmGuard} from './service/auth-pm.guard';
import {OrderBuyerComponent} from './user/order-buyer/order-buyer.component';
import {ListOrderDetailInBuyerComponent} from './pm/ListUserInPm/list-order-detail-in-buyer/list-order-detail-in-buyer.component';
import {ListOrderInUserBuyerComponent} from './pm/ListUserInPm/list-order-in-user-buyer/list-order-in-user-buyer.component';
import {ListUserInPmComponent} from './pm/ListUserInPm/list-user-in-pm/list-user-in-pm.component';
import {AuthAdminGuard} from './service/auth-admin.guard';
import { SearchByNameComponent } from './user/search-by-name/search-by-name.component';
import { InforUserComponent } from './user/infor-user/infor-user.component';
import { ShowProductPmComponent } from './user/show-product-pm/show-product-pm.component';


// @ts-ignore
export const appRoutes: Routes = [
  {path: '', component: UserComponent, data: {title: 'Home'}},
  {path: 'home', component: UserComponent, data: {title: 'Home'}},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'change-avatar', component: ChangeAvatarComponent},
  {path: 'pm', component: PmComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/listProduct', component: ShowListComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/editProduct/:id', component: EditComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/createProduct', component: CreateComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/listUser', component: ListUserInPmComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/listUserBuyer/:id', component: ListOrderInUserBuyerComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/orderDetail/:id', component: ListOrderDetailInBuyerComponent,canActivate:[AuthPmGuard]},
  {path: 'pm/detailProduct/:id', component: DetailProductComponent ,canActivate:[AuthPmGuard]},

  {path: 'index', component: UserComponent},
  {path: 'showProductByCategory', component: ListproductcategoryComponent},
  {path: 'showProductDetail', component: ProductDetailComponent},
  {path: 'showCartDetail', component: ShowCartComponent,canActivate:[AuthRouterGuard]},
  {path: 'admin', component: HomeAdminComponent,canActivate:[AuthAdminGuard]},
  {path: 'admin/showUser', component: ShowListUserComponent,canActivate:[AuthAdminGuard]},
  {path: 'admin/editUser/:id', component: EditUserComponent,canActivate:[AuthAdminGuard]},
  {path: 'pm/orders', component: OrderInPmComponent ,canActivate:[AuthPmGuard]},
  {path: 'pm/detailOrder/:orderId', component: DetailOrderInPmComponent ,canActivate:[AuthPmGuard]},
  {path: 'user/showOrders', component: OrderBuyerComponent,canActivate:[AuthRouterGuard]},
  {path: 'index/showOrders', component: SearchByNameComponent},
  {path: 'index/inforComponent', component: InforUserComponent,canActivate:[AuthRouterGuard]},
  {path: 'index/ShowProductPmComponent', component: ShowProductPmComponent,canActivate:[AuthRouterGuard]},

  {
    path: 'guide/getting-started',
    component: GettingStartedComponent,
    data: {title: 'Getting Started'}
  }
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, UploadAvatarComponent, ChangeAvatarComponent, PmComponent, UserComponent,ShowListComponent, IndexComponent,EditComponent, CreateComponent, ListproductcategoryComponent, ProductDetailComponent,DetailProductComponent, OrderInPmComponent, DetailOrderInPmComponent,ShowCartComponent,ShowListUserComponent,HomeAdminComponent, EditUserComponent, ListUserInPmComponent, ListOrderInUserBuyerComponent, ListOrderDetailInBuyerComponent,OrderBuyerComponent, SearchByNameComponent, InforUserComponent, ShowProductPmComponent],

  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NavBarModule, FooterModule,
    MatInputModule,
    NgxAudioPlayerModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // tslint:disable-next-line:max-line-length
    RouterModule.forRoot(appRoutes, {useHash: false}), MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule, MatDialogModule
  ],
  providers: [httpInterceptorProvider,TokenService,AuthRouterGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
