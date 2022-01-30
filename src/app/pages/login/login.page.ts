import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Service
import { LoginService, ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginGroup: FormGroup;
  showPasswordField: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService

  ){
    this.initLoginForm()
  }

  ngOnInit() {
    this.localStorageService.remove(this.localStorageService.tokenKey);
  }

  initLoginForm(){
    this.loginGroup = this.formBuilder.group({
      userName: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    })
  }

  showPassword(){
    this.showPasswordField = !this.showPasswordField;
  }

  keyDownFunction(event: KeyboardEvent){
    if(event.key === 'Enter'){
      this.submitForm();
    }
  }

  submitForm(){
    if(this.loginGroup.valid){
      this.subscription.add(
        this.loginService.login(this.loginGroup.value).subscribe(res=>{
          this.toastService.shortToastSuccess('Đăng nhập thành công', 'Thành công');
          this.localStorageService.set(this.localStorageService.tokenKey, res);
          this.router.navigateByUrl('/main');
        },err=>{
          if(err.status === 403 && err.error.message){
            this.toastService.shortToastError(err.error.message, 'Thất bại');
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
          }
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
