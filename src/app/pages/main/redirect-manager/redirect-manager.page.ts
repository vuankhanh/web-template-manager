import { Component, OnDestroy, OnInit } from '@angular/core';

import { ResponseLogin } from 'src/app/services/api/login.service';

import { RedirectInsertRespone, RedirectService } from 'src/app/services/api/redirect.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-redirect-manager',
  templateUrl: './redirect-manager.page.html',
  styleUrls: ['./redirect-manager.page.scss'],
})
export class RedirectManagerPage implements OnInit, OnDestroy {
  originalUrl: string;
  redirectInsertRespone: RedirectInsertRespone;

  subscription: Subscription = new Subscription();
  constructor(
    private redirectService: RedirectService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  createShortenedLink(){
    if(this.originalUrl){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        this.subscription.add(
          this.redirectService.insert(tokenStoraged.accessToken, this.originalUrl).subscribe(res=>{
            this.redirectInsertRespone = res;
          }, err=> this.redirectInsertRespone = null)
        )
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
