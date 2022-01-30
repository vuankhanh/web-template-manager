import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { AdminRight } from 'src/app/Interfaces/ServerConfig';

import { ConfigService } from 'src/app/services/api/config.service';
import { AdminManagementService, ReloadValue } from 'src/app/services/api/admin-management.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-management-modify',
  templateUrl: './admin-management-modify.page.html',
  styleUrls: ['./admin-management-modify.page.scss'],
})
export class AdminManagementModifyPage implements OnInit, OnDestroy {
  paramsId: string;

  adminAccountForm: FormGroup;
  adminRights: Array<AdminRight>;

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminManagementService: AdminManagementService,
    private configService: ConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.paramsId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    if(this.paramsId === 'new'){
      this.initForm();
    }else{
      this.getDetail(this.paramsId);
    }
    this.getConfig();
  }

  private initForm(adminInformation?: AdminInformation){
    this.adminAccountForm = this.formBuilder.group({
      userName: [adminInformation ? adminInformation.userName : '', Validators.required],
      name: [adminInformation ? adminInformation.name : '', Validators.required],
      avatar: [adminInformation ? adminInformation.avatar : ''],
      permission: [adminInformation ? adminInformation.permission : 4, Validators.required],
      activated: [adminInformation ? adminInformation.activated : true]
    });
  }

  private getDetail(id: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.adminManagementService.getDetail(tokenStoraged.accessToken, id).subscribe(res=>{
          this.initForm(res);
        })
      )
    }
  }

  private getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.adminRights = res.adminRights;
      })
    )
  }

  insert(token: string, account: AdminInformation){
    this.subscription.add(
      this.adminManagementService.insert(token, account).subscribe(res=>{
        this.router.navigate(['/main/account-management/admin']).then(_=>{
          let reloadValue: ReloadValue = {
            status: 'insert',
            adminInformation: res
          }
          this.adminManagementService.setReload(reloadValue);
        });
      })
    )
  }

  update(token: string, account: AdminInformation){
    this.adminManagementService.update(token, account).subscribe(res=>{
      this.router.navigate(['/main/account-management/admin']).then(_=>{
        let reloadValue: ReloadValue = {
          status: 'update',
          adminInformation: res
        }
        this.adminManagementService.setReload(reloadValue);
      });
    })
  }

  modify(){
    if(this.adminAccountForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(this.paramsId != 'new'){
        this.update(tokenStoraged.accessToken, this.adminAccountForm.value);
      }else{
        this.insert(tokenStoraged.accessToken, this.adminAccountForm.value);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
