import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { RegisterService } from '../service/register.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  isForget = false;
  loginForm = new FormGroup({
    username: new FormControl(),
    pwd: new FormControl(),
  });
  forgetForm = new FormGroup({ femail: new FormControl() });
  constructor(
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService,
    private regdataService: RegisterService,
    private session:SessionService,
    private rout:Router,
  ) {
    // this.snotifyService.success('snotify Works');
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
    });
    this.forgetForm = this.formBuilder.group({
      femail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if(this.session.isLoggenIn()){
      this.rout.navigate(['home']);//not to return login page
      window.alert("You are already logged in!,please signout to enter into login page.")
    }

  }

  get username() {
    return this.loginForm.get('username');
  }

  get pwd() {
    return this.loginForm.get('pwd');
  }
  get femail() {
    return this.forgetForm.get('femail');
  }
  forget() {
    console.log('anees');

    this.isForget = true;
  }
  forgetSubmit() {
    // let data = this.regdataService.getData();
    // const forgetData = this.forgetForm.value;
    this.snotifyService.success('password sent on registered Email!');
    this.forgetForm.reset();

  }
  onSubmit() {
    const loginData = this.loginForm.value;
    // console.log(loginData,loginData.username);
    let data = this.regdataService.getData();
    let userdata=data.filter((val:any)=>loginData.username == val.username && loginData.pwd == val.pwd)
    // console.log(data);

    // if (loginData.username=="test@gmail.com"&& loginData.pwd==12345678) {
    //   this.isLoginFailed = false;
    //   this.isLoggedIn = true;
    //   this.session.saveToken(loginData.username);
    //   this.snotifyService.success('You are logged in Successfully!');
    //   this.rout.navigate(['/home'],{queryParams:{username:loginData.username}})
    // } 
    if (userdata.length!=0) {
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.session.saveToken(loginData.username);
      this.rout.navigate(['/home'],{queryParams:{username:loginData.username}});
      this.snotifyService.success('You are logged in Successfully!');
    } 
    else {
      this.isLoginFailed = true;
    }
  }
}
