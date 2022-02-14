import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Order, OrderStatus } from 'src/app/Interfaces/Order';

import { ConfigService } from 'src/app/services/api/config.service';
import { ShippingPartner } from 'src/app/services/api/order.service';

import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

const timeCountDown: number = 5;
@Component({
  selector: 'app-action-confirmation',
  templateUrl: './action-confirmation.page.html',
  styleUrls: ['./action-confirmation.page.scss'],
})
export class ActionConfirmationPage implements OnInit, OnDestroy {
  @Input() newStatus: OrderStatus;
  @Input() order: Order;

  value: number = 1;

  timeCountDown: number = -1;
  destroy: Subject<null> = new Subject();

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

  createCountdown(){
    return interval(100).pipe(
      takeUntil(this.destroy),
      filter(()=>this.value>0)
    );
  }

  confirmAction(){
    if(this.formGroup.valid){

      if(this.timeCountDown>=0){
        this.reset();
      }else{
        this.subscription.add(
          this.createCountdown().subscribe(res=>{
            this.value = parseFloat((this.value-1/timeCountDown/10).toFixed(2));
            this.timeCountDown = Math.ceil(this.value*5);
            if(this.value <= 0){
              if(this.newStatus === 'isComing'){
                this.formGroup.value.shippingFee = this.formGroup.value.shippingFee.replace(/\D/g, '');
              }
              this.modalController.dismiss(this.formGroup.value);
            }
          })
        )
      }
    }
  }

  reset(){
    this.destroy.next();
    this.value = 1;
    this.timeCountDown = -1;
  }

  ngOnDestroy(){
    this.reset();
    this.subscription.unsubscribe();
  }

}
