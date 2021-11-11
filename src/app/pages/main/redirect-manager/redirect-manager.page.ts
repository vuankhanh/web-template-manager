import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { RedirectInsertRespone, RedirectService } from 'src/app/services/api/redirect.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-redirect-manager',
  templateUrl: './redirect-manager.page.html',
  styleUrls: ['./redirect-manager.page.scss'],
})
export class RedirectManagerPage implements OnInit {
  originalUrl: string;
  redirectInsertRespone: RedirectInsertRespone;
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
        this.redirectService.insert(tokenStoraged.accessToken, this.originalUrl).subscribe(res=>{
          this.redirectInsertRespone = res;
        }, err=> this.redirectInsertRespone = null);
      }
    }
  }

}
