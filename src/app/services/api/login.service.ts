import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { hostConfiguration } from '../../../environments/environment';

import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlLogin: string = hostConfiguration.host+'/login';
  private urlRefreshToken = hostConfiguration.host+'/refresh-token';
  constructor(
    private httpClient: HttpClient
  ) { }

  login(userName: UserName){
    return this.httpClient.post<ResponseLogin>(this.urlLogin, userName).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status === 403 && err.error.message){
          alert(err.error.message)
        }
        return throwError(err);
      })
    );
  }

  refreshToken(refreshToken: string){
    return this.httpClient.post<ResponseRefreshToken>(this.urlRefreshToken, { refreshToken });
  }
}

export interface UserName{
  userName: string,
  password: string
}

export interface ResponseLogin{
  accessToken: string,
  refreshToken: string,
  message: string
}

export interface ResponseRefreshToken{
  accessToken: string
}

export interface UserInformation{
  userName: string,
  name: string,
  avatar: string,
  perrmission: number
}
