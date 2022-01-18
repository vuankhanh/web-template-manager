import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { AdminManagementService } from 'src/app/services/api/admin-management.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.page.html',
  styleUrls: ['./admin-management.page.scss'],
})
export class AdminManagementPage implements OnInit {
  adminList: Array<AdminInformation>;
  displayedColumns: string[] = [
    'userName',
    'name',
    'avatar',
    'permission',
    'createdAt',
    'updatedAt'
  ];
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  paginationParams: PaginationParams;

  subscription: Subscription = new Subscription();
  constructor(
    private localStorageService: LocalStorageService,
    private adminManagementService: AdminManagementService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

    if(tokenStoraged){
      this.subscription.add(
        this.adminManagementService.getAll(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          console.log(res);
          this.adminList = res.data;
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
