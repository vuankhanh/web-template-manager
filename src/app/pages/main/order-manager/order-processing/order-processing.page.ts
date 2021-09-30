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
    console.log(this.orderId);
    this.getDetail()
  }

  getDetail(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    this.subscription.add(
      this.orderService.getDetai(tokenStoraged.accessToken, this.orderId).subscribe(res=>{
        console.log(res);
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
      console.log(res);
      let comments: string = res.data && res.data.comments ? res.data.comments : '';
      if(comments){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        this.subscription.add(
          this.orderService.revokeOrder(tokenStoraged.accessToken, order._id, comments).subscribe(res=>{
            let order: OrderDetail = res;
            console.log(order);
            if(!order){
              this.toastService.shortToastWarning('Không thể hủy đơn hàng này', 'Không thành công');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('Đã hủy đơn hàng '+this.order.code, 'Thành công');
            }
          })
        )
      }
    });
  }

  confirmOrder(order: Order){
    this.orderManagementModalService.open('confirmed', order).then(res=>{
      console.log(res);
      let confirmation: boolean = res.data.value || false;
      if(confirmation){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

        this.subscription.add(
          this.orderService.confirmOrder(tokenStoraged.accessToken, order._id).subscribe(res=>{
            let order: OrderDetail = res;
            console.log(order);
            if(!order){
              this.toastService.shortToastWarning('Không thể xác nhận đơn hàng này', 'Không thành công');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('Đã xác nhận đơn hàng '+this.order.code, 'Thành công');
            }
          })
        )
      }
    });

  }

  isComingOrder(order: Order){
    this.orderManagementModalService.open('isComing', order).then(res=>{
      console.log(res);
      let shippingPartner: ShippingPartner = res.data;
      if(shippingPartner && shippingPartner.id && shippingPartner.shippingFee){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

        this.subscription.add(
          this.orderService.isComingOrder(tokenStoraged.accessToken, order._id, shippingPartner).subscribe(res=>{
            let order: OrderDetail = res;
            console.log(order);
            if(!order){
              this.toastService.shortToastWarning('Không thể vận chuyển đơn hàng này', 'Không thành công');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('Đã xác nhận vận chuyến đơn hàng '+this.order.code, 'Thành công');
            }
          })
        )
      }
    });
  }

  finish(order: Order){
    this.orderManagementModalService.open('done', order).then(res=>{
      console.log(res);
      let confirmation: boolean = res.data.value || false;
      if(confirmation){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        this.subscription.add(
          this.orderService.finish(tokenStoraged.accessToken, order._id).subscribe(res=>{
            let order: OrderDetail = res;
            console.log(order);
            if(!order){
              this.toastService.shortToastWarning('Không thể hoàn thành đơn hàng này', 'Không thành công');
            }else{
              this.order = order;
              this.toastService.shortToastSuccess('Đã hoàn thành vận chuyến đơn hàng '+this.order.code, 'Thành công');
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
