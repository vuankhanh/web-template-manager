import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Service
import { LoginService, AuthenticationInformation } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginGroup: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService

  ){
    this.initLoginForm()
  }

  ngOnInit() {
    this.localStorageService.remove(tokenKey);
  }

  initLoginForm(){
    this.loginGroup = this.formBuilder.group({
      userName: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    })
  }

  submitForm(){
    if(this.loginGroup.valid){
      this.subscription.add(
        this.loginService.login(this.loginGroup.value).subscribe(async res=>{
          await this.localStorageService.set(tokenKey, res);
          this.router.navigateByUrl('/main');
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
