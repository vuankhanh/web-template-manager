import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ahamove',
  templateUrl: './ahamove.page.html',
  styleUrls: ['./ahamove.page.scss'],
})
export class AhamovePage implements OnInit, OnDestroy {
  pages = [
    { title: 'Lịch sử đơn hàng', url: 'history', icon: 'chatbubbles' },
    { title: 'Tạo mới', url: 'new', icon: 'chatbubbles' },
  ];

  currentUrl: string;
  rootUrl: string;
  childUrl: string;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    let split = this.currentUrl.split('/');
    this.childUrl = split[split.length-1];
    split.pop();
    this.rootUrl = split.join('/');
  }

  segmentChanged(){
    this.router.navigate([this.rootUrl+'/'+this.childUrl]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
