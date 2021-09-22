import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';
import { ConfigService } from '../api/config.service';
import { ResponseLogin } from '../api/login.service';
import { AuthService } from '../auth.service';

import { Observable, of } from 'rxjs';
import { catchError , map } from 'rxjs/operators'

const tokenKey = "authentication-information";
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        return this.configService.getConfig(accessToken).pipe(map(res=>{
          if(res){            
            this.authService.setUserInfoFromTokenStoraged(tokenStoraged.accessToken);
            this.configService.set(res);
            return true;
          }else{
            return false;
          }
          
        }), catchError(error=>{
          this.authService.logout();
          return of(false);
        }));
      }else{
        this.authService.logout();
        return false;
      }
  }
  
}
