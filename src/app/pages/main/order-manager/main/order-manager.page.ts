import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { OrderStatus } from 'src/app/Interfaces/ServerConfig';
import { Order } from 'src/app/Interfaces/Order';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams'

import { ConfigService } from 'src/app/services/api/config.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { OrderService } from 'src/app/services/api/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlatformService } from 'src/app/services/platform.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.page.html',
  styleUrls: ['./order-manager.page.scss'],
})
export class OrderManagerPage implements OnInit, OnDestroy {
  orderCode: string;

  orderStatusesConfig: Array<OrderStatus>;
  createdBysConfig: Array<OrderStatus>;

  orderList: Array<Order>;
  displayedColumns: string[] = ['position', 'code', 'totalValue', 'status', 'createdBy', 'createdAt', 'updatedAt'];
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  paginationParams: PaginationParams;
  orderStatusParam: string;
  orderCreatedByParam: string;

  isDesktop: boolean = this.platformService.isDesktop();

  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private orderService: OrderService,
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    private platformService: PlatformService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.getConfig();
    
  }

  getAll(paginationParams?: PaginationParams, status?: string, createdBy?: string, orderCode?: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    this.subscription.add(
      this.orderService.getAll(
        tokenStoraged.accessToken,
        paginationParams,
        status,
        createdBy,
        orderCode
      ).subscribe(res=>{
        console.log(res);
        this.orderList = res.data;
        this.paginationParams = {
          totalItems: res.totalItems,
          size: res.size,
          page: res.page-1,
          totalPages: res.totalPages
        }
      })
    );
  }

  getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.orderStatusesConfig = res.orderStatus;
        this.createdBysConfig = res.orderCreatedBy;
        console.log(this.orderStatusesConfig);
        console.log(this.createdBysConfig);
      })
    )
  }

  filterNameOrderStatus(code: string){
    return this.configService.filterNameOrderStatus(code);
  }

  filterNameOrderCreatedBy(code: string){
    return this.configService.filterNameOrderCreatedBy(code);
  }

  orderStatusParamChange(){
    this.getAll(this.paginationParams, this.orderStatusParam, this.orderCreatedByParam);
  }

  orderCreatedByParamChange(){
    this.getAll(this.paginationParams, this.orderStatusParam, this.orderCreatedByParam);
  }

  blurFilter(){
    console.log(this.orderCode);
    this.getAll(this.paginationParams, this.orderStatusParam, this.orderCreatedByParam, this.orderCode);
  }

  orderProcessing(order: Order){
    console.log(order);
    this.router.navigate(['/main/order-manager/order-processing', order._id]);
  }


  //Xử lý sự kiện thay đổi của phân trang
  handlePageEvent(event: PageEvent) {
    let objectParams = Object.assign({}, this.paginationParams);
    objectParams.page = event.pageIndex+1;
    objectParams.size = event.pageSize;

    this.getAll(objectParams, this.orderStatusParam, this.orderCreatedByParam);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
