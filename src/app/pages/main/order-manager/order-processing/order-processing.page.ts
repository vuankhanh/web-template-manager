import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderDetail } from 'src/app/Interfaces/Order';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { OrderService } from 'src/app/services/api/order.service';
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

  revokeOrder(id: string){
    this.orderManagementModalService.open().then(res=>{
      console.log(res);
      if(res.data){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        this.subscription.add(
          this.orderService.revokeOrder(tokenStoraged.accessToken, id, res.data).subscribe(res=>{
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

  confirmOrder(id: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    this.subscription.add(
      this.orderService.confirmOrder(tokenStoraged.accessToken, id).subscribe(res=>{
        console.log(res);
      })
    )
  }

  isComingOrder(id: string){
    
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    this.subscription.add(
      this.orderService.confirmOrder(tokenStoraged.accessToken, id).subscribe(res=>{
        console.log(res);
      })
    )
  }

  finish(id: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    this.subscription.add(
      this.orderService.confirmOrder(tokenStoraged.accessToken, id).subscribe(res=>{
        console.log(res);
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
