import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order, OrderDetail } from 'src/app/Interfaces/Order';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { OrderService, ShippingPartner } from 'src/app/services/api/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfigService } from 'src/app/services/api/config.service';
import { ToastService } from 'src/app/services/toast.service';
import { OrderManagementModalService } from 'src/app/services/order-management-modal.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-processing',
  templateUrl: './order-processing.page.html',
  styleUrls: ['./order-processing.page.scss'],
})
export class OrderProcessingPage implements OnInit, OnDestroy {
  orderId: string;
  order: OrderDetail;

  displayedColumns: string[] = ['name', 'price', 'quantity'];

  subscription: Subscription = new Subscription()
  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private configService: ConfigService,
    private toastService: ToastService,
    private orderManagementModalService: OrderManagementModalService
  ) {
    this.orderId = this.activatedRoute.snapshot.params.oderId;
  }

  ngOnInit() {
    this.getDetail()
  }

  getDetail(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    this.subscription.add(
      this.orderService.getDetai(tokenStoraged.accessToken, this.orderId).subscribe(res=>{
        this.order = res;
      })
    )
  }

  filterNameOrderStatus(code: string){
    return this.configService.filterNameOrderStatus(code);
  }

  filterNameOrderCreatedBy(code: string){
    return this.configService.filterNameOrderCreatedBy(code);
  }

  revokeOrder(order: Order){
    this.orderManagementModalService.open('revoke', order).then(res=>{
      let comments: string = res.data && res.data.comments ? res.data.comments : '';
      if(comments){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        this.subscription.add(
          this.orderService.revokeOrder(tokenStoraged.accessToken, order._id, comments).subscribe(res=>{
            let order: OrderDetail = res;
            if(!order){
              this.toastService.shortToastWarning('Kh??ng th??? h???y ????n h??ng n??y', 'Kh??ng th??nh c??ng');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('???? h???y ????n h??ng '+this.order.code, 'Th??nh c??ng');
            }
          })
        )
      }
    });
  }

  confirmOrder(order: Order){
    this.orderManagementModalService.open('confirmed', order).then(res=>{
      let confirmation: boolean = res.data.value || false;
      if(confirmation){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

        this.subscription.add(
          this.orderService.confirmOrder(tokenStoraged.accessToken, order._id).subscribe(res=>{
            let order: OrderDetail = res;
            if(!order){
              this.toastService.shortToastWarning('Kh??ng th??? x??c nh???n ????n h??ng n??y', 'Kh??ng th??nh c??ng');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('???? x??c nh???n ????n h??ng '+this.order.code, 'Th??nh c??ng');
            }
          })
        )
      }
    });

  }

  isComingOrder(order: Order){
    this.orderManagementModalService.open('isComing', order).then(res=>{
      let shippingPartner: ShippingPartner = res.data;
      if(shippingPartner && shippingPartner.id && shippingPartner.shippingFee){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

        this.subscription.add(
          this.orderService.isComingOrder(tokenStoraged.accessToken, order._id, shippingPartner).subscribe(res=>{
            let order: OrderDetail = res;
            if(!order){
              this.toastService.shortToastWarning('Kh??ng th??? v???n chuy???n ????n h??ng n??y', 'Kh??ng th??nh c??ng');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('???? x??c nh???n v???n chuy???n ????n h??ng '+this.order.code, 'Th??nh c??ng');
            }
          })
        )
      }
    });
  }

  finish(order: Order){
    this.orderManagementModalService.open('done', order).then(res=>{
      let confirmation: boolean = res.data.value || false;
      if(confirmation){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        this.subscription.add(
          this.orderService.finish(tokenStoraged.accessToken, order._id).subscribe(res=>{
            let order: OrderDetail = res;
            if(!order){
              this.toastService.shortToastWarning('Kh??ng th??? ho??n th??nh ????n h??ng n??y', 'Kh??ng th??nh c??ng');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('???? ho??n th??nh v???n chuy???n ????n h??ng '+this.order.code, 'Th??nh c??ng');
            }
          })
        )
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
