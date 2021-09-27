import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { OrderStatus } from 'src/app/Interfaces/ServerConfig';
import { Order } from 'src/app/Interfaces/Order';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams'

import { ConfigService } from 'src/app/services/api/config.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { OrderService } from 'src/app/services/api/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlatformService } from 'src/app/services/platform.service';

import { Subscription } from 'rxjs';

const date = new Date();
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.page.html',
  styleUrls: ['./order-manager.page.scss'],
})
export class OrderManagerPage implements OnInit, OnDestroy {
  orderCode: string;

  orderStatusesConfig: Array<OrderStatus>;
  createdBysConfig: Array<OrderStatus>;

  range = new FormGroup({
    start: new FormControl(new Date(date.getFullYear(), date.getMonth(), 1)),
    end: new FormControl(date)
  });
  
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
    private adapter: DateAdapter<any>,
    private orderService: OrderService,
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    private platformService: PlatformService,
  ) {
    this.adapter.setLocale('vi');

  }

  ngOnInit() {
    this.getAll(
      null,
      null,
      null,
      null,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
    this.getConfig();
    
  }

  getAll(
    paginationParams?: PaginationParams,
    status?: string,
    createdBy?: string,
    orderCode?: string,
    fromDate?: Date,
    toDate?: Date
  ){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    this.subscription.add(
      this.orderService.getAll(
        tokenStoraged.accessToken,
        paginationParams,
        status,
        createdBy,
        orderCode,
        fromDate,
        toDate
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
    this.getAll(
      this.paginationParams,
      this.orderStatusParam,
      this.orderCreatedByParam,
      this.orderCode,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
  }

  orderCreatedByParamChange(){
    this.getAll(
      this.paginationParams,
      this.orderStatusParam,
      this.orderCreatedByParam,
      this.orderCode,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
  }

  startDateChange(event: MatDatepickerInputEvent<Date>){
    console.log('start Date');
    console.log(event.value);
    console.log(this.range.controls['start'].value);
    if(event.value){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        event.value,
        this.range.controls['end'].value,
      );
    }
  }

  endDateChange(event: MatDatepickerInputEvent<Date>){
    console.log('end Date');
    console.log(event.value);
    if(event.value){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        this.range.controls['start'].value,
        event.value,
      );
    }
  }

  blurFilter(){
    console.log(this.orderCode);
    this.getAll(
      this.paginationParams,
      this.orderStatusParam,
      this.orderCreatedByParam,
      this.orderCode,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
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

    this.getAll(
      objectParams,
      this.orderStatusParam,
      this.orderCreatedByParam,
      this.orderCode,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
