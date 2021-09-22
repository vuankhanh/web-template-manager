import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  displayTime: number;
  value: number;

  countDownDisplayTime: Observable<number> = interval(1000).pipe(take(timeCountDown));
  countDownValue: Observable<number> = interval(100).pipe(take(timeCountDown*10));

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {

  }

  confirmAction(){
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
          this.modalController.dismiss(true);
        }
      })
    );

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
