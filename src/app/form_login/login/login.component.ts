import {Component, OnInit} from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: any = {};
  signInForm: SignInForm;
  status = 'Please fill in the form to Login!';
  isCheckLoginFailed = false;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    this.authService.signIn(this.signInForm).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data.token != undefined) {
        this.tokenService.setTokenKey(data.token);
        this.tokenService.setNameKey(data.name);
        this.tokenService.setRoleKey(data.roles);
        this.tokenService.setAvatarKey(data.avatar);
        this.tokenService.setCart(data.cart);
        this.tokenService.setListCardDetail(data.cartDetailList);
        this.tokenService.setUserNameKey(data.username);
        this.tokenService.setAddressKey(data.address);
        console.log("this.authService.loggedInUser()");
        console.log(this.authService.loggedInUser());
        console.log("this.authService.loggedInPM()");
        console.log(this.authService.loggedInPM());
        console.log("this.authService.loggedInAdmin()");
        console.log(this.authService.loggedInAdmin());
          this.router.navigate(['index']).then(() => {
            window.location.reload();
          });

      } else {
        this.isCheckLoginFailed = true;
        this.showAlert('LOGIN FAILED! Please try again!') ;
      }
    });
  }
  showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 1500);
  }

}
