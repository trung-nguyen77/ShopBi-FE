import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouterGuard implements CanActivate {
  constructor(private authService:AuthService, private  tokenService:TokenService, private router:Router) {
  }
  canActivate(): boolean  {
    if(this.authService.loggedInUser() ){
    return true
    }else {
      this.router.navigate(["login"]);
      return false;
    }
  }


}
