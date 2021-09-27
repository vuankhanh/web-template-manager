import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Order, OrderStatus } from 'src/app/Interfaces/Order';

import { ConfigService } from 'src/app/services/api/config.service';
import { ShippingPartner } from 'src/app/services/api/order.service';

import { interval, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

const timeCountDown: number = 5;
const valueCountDown: number = 1;
@Component({
  selector: 'app-action-confirmation',
  templateUrl: './action-confirmation.page.html',
  styleUrls: ['./action-confirmation.page.scss'],
})
export class ActionConfirmationPage implements OnInit, OnDestroy {
  @Input() newStatus: OrderStatus;
  @Input() order: Order;

  displayTime: number;
  value: number;

  formGroup: FormGroup;

  countDownDisplayTime: Observable<number> = interval(1000).pipe(take(timeCountDown));
  countDownValue: Observable<number> = interval(100).pipe(take(timeCountDown*10));

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    switch(this.newStatus){
      case 'revoke':
        this.formGroup = this.formBuilder.group({
          comments: ['', Validators.required]
        });
        break;
      case 'isComing':
        this.formGroup = this.formBuilder.group({
          id: ['', Validators.required],
          shippingFee: ['', Validators.required]
        });
        break;
      default :
        this.formGroup = this.formBuilder.group({
          value: true
        });
    }
  }

  filterNameOrderStatus(code: string){
    return this.configService.filterNameOrderStatus(code);
  }

  filterNameOrderCreatedBy(code: string){
    return this.configService.filterNameOrderCreatedBy(code);
  }

  confirmAction(){
    if(this.formGroup.valid){
      this.displayTime = timeCountDown;
      this.value = valueCountDown;
      
      this.subscription.add(
        this.countDownValue.subscribe(res=>{
          let subtrahend: number = res+1;
          this.value = valueCountDown - (subtrahend/(timeCountDown*10));
        })
      );
      this.subscription.add(
        this.countDownDisplayTime.subscribe(res=>{
          let subtrahend: number = res+1;
          this.displayTime = timeCountDown - subtrahend;
          if(this.displayTime === 0){
            if(this.newStatus === 'isComing'){
              this.formGroup.value.shippingFee = this.formGroup.value.shippingFee.replace(/\D/g, '');
            }
            this.modalController.dismiss(this.formGroup.value);
          }
        })
      );
    }

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
