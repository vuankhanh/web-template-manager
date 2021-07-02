import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AdminInformation, JwtDecoded } from '../Interfaces/AdminInformation';

import { JwtDecodedService } from './jwt-decoded.service';
import { LocalStorageService } from './local-storage.service';
import { ResponseLogin } from './api/login.service';

import { BehaviorSubject, Observable } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInformation: BehaviorSubject<AdminInformation | null> = new BehaviorSubject<AdminInformation | null>(null);
  constructor(
    private router: Router,
    private jwtDecodedService: JwtDecodedService,
    private localStorageService: LocalStorageService
  ) {
    this.getUserInfoFromTokenStoraged();
  }


  getUserInfoFromTokenStoraged(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(tokenStoraged.accessToken);
        if(tokenInformation){
          this.setUserInformation(tokenInformation.data);
        }
    }
  }

  logout(){
    this.userInformation.next(null);
    this.localStorageService.remove(tokenStoragedKey);
    return this.router.navigate(['/login']);
  }

  setUserInformation(userInformation: AdminInformation | null){
    this.userInformation.next(userInformation);
  }

  getUserInformation():Observable<AdminInformation | null>{
    return this.userInformation.asObservable()
  }
}
