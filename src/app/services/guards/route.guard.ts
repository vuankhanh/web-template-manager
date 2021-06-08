import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';
import { ConfigService } from '../api/config.service';

import { Observable } from 'rxjs';
const tokenKey = "authentication-information";
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.localStorageService.get(tokenKey).then(async authenticationToken=>{
      console.log(authenticationToken);
      if(authenticationToken && authenticationToken.accessToken){
        let accessToken = authenticationToken.accessToken;
        console.log(accessToken);
        let a = await this.configService.getConfig(accessToken).toPromise().then(_=>{
          return true;
        }).catch(_=>{
          this.router.navigateByUrl('/login');
          return false;
        });
        console.log(a);
        return a;
      }
      this.router.navigateByUrl('/login');
      return false;
    });
  }
  
}
