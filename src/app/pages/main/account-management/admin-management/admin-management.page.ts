import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { AdminManagementService } from 'src/app/services/api/admin-management.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.page.html',
  styleUrls: ['./admin-management.page.scss'],
})
export class AdminManagementPage implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

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
    private changeDetectorRefs: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
    private adminManagementService: AdminManagementService
  ) { }

  ngOnInit() {
    this.getAll();
    this.listenReload();
  }

  getAll(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

    if(tokenStoraged){
      this.subscription.add(
        this.adminManagementService.getAll(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
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

  listenReload(){
    this.subscription.add(
      this.adminManagementService.reload$.subscribe(res=>{
        if(res && this.adminList){
          if(res.status ==='insert'){
            this.adminList.push(res.adminInformation);
          }else{
            let index: number = this.adminList.findIndex(adminAccount=>adminAccount._id === res.adminInformation._id);
            this.adminList[index] = res.adminInformation;
          }
          this.table.renderRows();
        }
      })
    )
  }

  //X??? l?? s??? ki???n thay ?????i c???a ph??n trang
  handlePageEvent(event: PageEvent) {
    let objectParams = Object.assign({}, this.paginationParams);
    objectParams.page = event.pageIndex+1;
    objectParams.size = event.pageSize;

    this.getAll(objectParams);
  }

}
