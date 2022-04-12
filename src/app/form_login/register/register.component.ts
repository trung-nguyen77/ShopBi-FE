import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {SignUpForm} from '../../model/SignUpForm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,AfterViewInit {
  @ViewChild("submitBtn")submitBtn:ElementRef;
  @ViewChild("name")name:ElementRef;
  @ViewChild("email")email:ElementRef;
  @ViewChild("password")password:ElementRef;
  @ViewChild("username")username:ElementRef;
  form: any = {};
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  signUpForm: SignUpForm;
  error1: any = {
    message: 'no_user'
  };
  error2: any = {
    message: 'no_email'
  };
  success: any = {
    message: 'yes'
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.error1)) {
        this.showAlert('The username is existed! Please try!');
      }
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.error2)) {
        this.showAlert('The email is existed! Please try!') ;
      }
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.success)) {
        this.showAlert('Create account success!');
        this.router.navigate(['login']).then(() => {
          window.location.reload();
        });
      }
    });
  }

  registerFrom(){
// select input

    this.submitBtn.nativeElement.addEventListener('click', () => {
      console.log(this.email.nativeElement.value.length)
      if(this.name != null){ // sign up page
        if(this.name.nativeElement.length < 3){
          this.showAlert('name must be 3 letters long');
        } else if(!this.email.nativeElement.value.length){
          this.showAlert('enter your email');
        } else if(this.password.nativeElement.value.length < 8){
          this.showAlert('password should be 8 letters long');
        } else if(!this.username.nativeElement.value.length){
          this.showAlert('name must be 3 letters long');
        }else {
          this.ngSubmit()
        }
      }
    })
  }
   showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 1000);
  }
}
