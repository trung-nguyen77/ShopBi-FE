import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/JwtResponse';
import {SignInForm} from '../model/SignInForm';
import {ChangeAvatar} from '../model/ChangeAvatar';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // API_LOCAL
  private API_SIGNUP = environment.API_LOCAL + 'signup';
  private API_SIGNIN = environment.API_LOCAL + 'signin';
  private API_CHANGE_AVATAR = environment.API_LOCAL + 'change-avatar';
  // API_SERVER
  // private API_SIGNUP = environment.API_SERVER+'signup';
  constructor(private http: HttpClient, private tokenService:TokenService) {
  }

  signUp(signUpForm: SignUpForm): Observable<any> {
    return this.http.post(this.API_SIGNUP, signUpForm);
  }

  signIn(signInForm: SignInForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }

  changeAvatar(changeAvatar: ChangeAvatar): Observable<ChangeAvatar> {
    return this.http.put<ChangeAvatar>(this.API_CHANGE_AVATAR, changeAvatar);
  }
  loggedInUser():boolean{

    if(this.tokenService.getDecodedAccessToken()!== null && this.tokenService.getDecodedAccessToken().sub == this.tokenService.getUserNameKey()){
      for (const argument of this.tokenService.getRoleKey()) {
        if(argument == "USER"){
          return true;
        }
      }
    }else {
      return false;
    }
  }
  loggedInPM():boolean{
    console.log("this.tokenService.getDecodedAccessToken().sub == this.tokenService.getUserNameKey()  ");
    console.log(this.tokenService.getUserNameKey());
    console.log(this.tokenService.getDecodedAccessToken().sub == this.tokenService.getUserNameKey());
    console.log("this.tokenService.getRoleKey()");
    console.log(this.tokenService.getRoleKey());

    if(this.tokenService.getDecodedAccessToken()!== null && this.tokenService.getDecodedAccessToken().sub == this.tokenService.getUserNameKey()){
      for (const argument of this.tokenService.getRoleKey()) {
        if(argument == "PM"){
          return true;
        }
      }
    }else {
      return false;
    }
  }
  loggedInAdmin():boolean{
    if(this.tokenService.getDecodedAccessToken()!== null && this.tokenService.getDecodedAccessToken().sub == this.tokenService.getUserNameKey()){
      for (const argument of this.tokenService.getRoleKey()) {
        if(argument == "ADMIN"){
          return true;
        }
      }
    }else {
      return false;
    }
  }
}
