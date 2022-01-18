import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { ClientAuthentication } from 'src/app/Interfaces/ClientAuthentication';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { UserManagementService } from 'src/app/services/api/user-management.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  userList: Array<ClientAuthentication>;
  displayedColumns: string[] = [
    'email',
    'code',
    'name',
    'phoneNumber',
    'allowAccount',
    'allowFacebook',
    'allowGoogle',
    'createdAt',
    'updatedAt'
  ];
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  paginationParams: PaginationParams;

  subscription: Subscription = new Subscription();
  constructor(
    private userManagementService: UserManagementService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

    if(tokenStoraged){
      this.subscription.add(
        this.userManagementService.getAll(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          console.log(res);
          this.userList = res.data;
          this.paginationParams = {
            totalItems: res.totalItems,
            size: res.size,
            page: res.page-1,
            totalPages: res.totalPages
          }
        })
      )
    }
  }

  //Xử lý sự kiện thay đổi của phân trang
  handlePageEvent(event: PageEvent) {
    let objectParams = Object.assign({}, this.paginationParams);
    objectParams.page = event.pageIndex+1;
    objectParams.size = event.pageSize;

    this.getAll(objectParams);
  }

}
