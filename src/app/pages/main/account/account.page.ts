import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountSetting } from 'src/app/Interfaces/AccountSetting';
import { AccountService } from 'src/app/services/api/account.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

//Validation Form
import { safePassword, isSameInConfirmPassword } from '../../../services/formCustom/validators';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  settings: Array<AccountSetting> = [
    {
      groupName: 'Bảo mật',
      items: [
        {
          icon: 'key-outline',
          title: 'Đổi mật khẩu',
          isOpen: false
        }
      ]
    }
  ];

  showChangePassword: boolean = false;
  changePasswordForm: FormGroup;

  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  togglePasswordChange(){
    this.showChangePassword = !this.showChangePassword;
    if(this.showChangePassword && !this.changePasswordForm){
      this.initForm();
    }
  }


  initForm(){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['',
        { 
          validators: [Validators.required, safePassword()],
          updateOn: 'blur'
        }
      ],
      confirmPassword: ['',
        {
          validators: [Validators.required, isSameInConfirmPassword()],
          updateOn: 'blur'
        }
      ],
    })
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

      if(tokenStoraged){
        this.subscription.add(
          this.accountService.changePassword(tokenStoraged.accessToken, this.changePasswordForm.value).subscribe(res=>{
            if(res){
              this.toastService.shortToastSuccess('Đã đổi mật khẩu thành công', 'Thành công');
              this.showChangePassword = false;
            }
          },err=>{
            if(err.status === 400){
              if(err.error.message === 'Password is incorrect'){
                this.toastService.shortToastError('Sai mật khẩu cũ', 'Thất bại');
                let oldPasswordControl = this.changePasswordForm.controls['oldPassword'];
                oldPasswordControl.setErrors({ oldPasswordIsIncorrect: true });
              }else if(err.error.message === 'Missing parameter'){
                this.toastService.shortToastError('Thiếu tham số', 'Thất bại');
              }else if(err.error.message === 'Password is invalid'){
                this.toastService.shortToastError('Mật khẩu không hợp lệ', 'Thất bại');
              }
            }else{
              this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
            }
          })
        )
      }
    }
  }
}
