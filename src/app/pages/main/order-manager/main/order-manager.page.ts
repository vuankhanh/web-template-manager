import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { IonInput } from '@ionic/angular';

const date = new Date();
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.page.html',
  styleUrls: ['./order-manager.page.scss'],
})
export class OrderManagerPage implements OnInit, OnDestroy {
  @ViewChild('inputOrderCode', { static: false }) inputOrderCode: IonInput;
  @ViewChild('inputPhoneNumber', { static: false }) inputPhoneNumber: IonInput;
  
  orderCode: string;
  phoneNumber: string;

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
    phoneNumber?: string,
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
        phoneNumber,
        fromDate,
        toDate
      ).subscribe(res=>{
        this.orderList = res.data;
        this.paginationParams = {
          totalItems: res.totalItems,
          size: res.size,
          page: res.page-1,
          totalPages: res.totalPages
        }
      },error=>{
      })
    );
  }

  getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.orderStatusesConfig = res.orderStatus;
        this.createdBysConfig = res.orderCreatedBy;
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
      this.phoneNumber,
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
      this.phoneNumber,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
  }

  startDateChange(event: MatDatepickerInputEvent<Date>){
    if(event.value){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        this.phoneNumber,
        event.value,
        this.range.controls['end'].value,
      );
    }
  }

  endDateChange(event: MatDatepickerInputEvent<Date>){
    if(event.value){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        this.phoneNumber,
        this.range.controls['start'].value,
        event.value,
      );
    }
  }

  blurOrderCode(){
    if(this.orderCode){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        this.phoneNumber,
        this.range.controls['start'].value,
        this.range.controls['end'].value
      );
    }
  }

  enterKeydownInputOrderCode(){
    this.inputOrderCode.getInputElement().then(inputOrderCode=>inputOrderCode.blur());
  }

  blurPhoneNumber(){
    if(this.phoneNumber){
      this.getAll(
        this.paginationParams,
        this.orderStatusParam,
        this.orderCreatedByParam,
        this.orderCode,
        this.phoneNumber,
        this.range.controls['start'].value,
        this.range.controls['end'].value
      );
    }
  }

  enterKeydownInputPhoneNumber(){
    this.inputPhoneNumber.getInputElement().then(inputPhoneNumber=>inputPhoneNumber.blur());
  }

  orderProcessing(order: Order){
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
      this.phoneNumber,
      this.range.controls['start'].value,
      this.range.controls['end'].value
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
