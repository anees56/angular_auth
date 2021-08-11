import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  regForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    pwd: new FormControl(),
    pwd1: new FormControl(),
  });
  constructor(
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService,
    private regdataService: RegisterService
  ) {
    this.regForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
      pwd1: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  get username() {
    return this.regForm.get('username');
  }

  get pwd() {
    return this.regForm.get('pwd');
  }
  get pwd1() {
    return this.regForm.get('pwd1');
  }

  get email() {
    return this.regForm.get('email');
  }

  onSubmit() {
    this.isSuccessful = true;
    this.isSignUpFailed = false;
    // console.log(regData,regData.email);
    this.regdataService.setData(this.regForm.value);
    this.snotifyService.success('Registration Successfully Done!');
    this.regForm.reset();

  }
}
