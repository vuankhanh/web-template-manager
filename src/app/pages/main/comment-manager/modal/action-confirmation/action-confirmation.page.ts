import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductReviews, ProductReviewsCodeStatus } from 'src/app/Interfaces/ProductReviews';

import { ConfigService } from 'src/app/services/api/config.service';

import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

const timeCountDown: number = 5;

@Component({
  selector: 'app-action-confirmation',
  templateUrl: './action-confirmation.page.html',
  styleUrls: ['./action-confirmation.page.scss'],
})
export class ActionConfirmationPage implements OnInit, OnDestroy {
  @Input() newStatus: ProductReviewsCodeStatus;
  @Input() productReviews: ProductReviews;

  value: number = 1;

  timeCountDown: number = -1;
  destroy: Subject<null> = new Subject();

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private configService: ConfigService
  ) { }

  ngOnInit() {}
  
  filterNameProductReviewsStatus(code: ProductReviewsCodeStatus){
    return this.configService.filterNameProductReviewsStatus(code);
  }

  createCountdown(){
    return interval(100).pipe(
      takeUntil(this.destroy),
      filter(()=>this.value>0)
    );
  }

  changeStatus(){
    if(this.timeCountDown>=0){
      this.reset();
    }else{
      this.subscription.add(
        this.createCountdown().subscribe(res=>{
          this.value = parseFloat((this.value-1/timeCountDown/10).toFixed(2));
          this.timeCountDown = Math.ceil(this.value*5);
          if(this.value <= 0){
            this.modalController.dismiss(true);
          }
        })
      )
    }
  }

  reset(){
    this.destroy.next();
    this.value = 1;
    this.timeCountDown = -1;
  }

  ngOnDestroy(): void {
    this.reset();
    this.subscription.unsubscribe();
  }
}
