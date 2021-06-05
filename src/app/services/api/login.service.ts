import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { hostConfiguration } from '../../../environments/environment';

import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = hostConfiguration.host+'/login';
  constructor(
    private httpClient: HttpClient
  ) { }

  login(userName: UserName){
    return this.httpClient.post<AuthenticationInformation>(this.url, userName).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status === 403 && err.error.message){
          alert(err.error.message)
        }
        return throwError(err);
      })
    );
  }
}

export interface UserName{
  userName: string,
  password: string
}

export interface AuthenticationInformation{
  accessToken: string,
  refreshToken: string,
  message: string
}

export interface UserInformation{
  userName: string,
  name: string,
  avatar: string,
  perrmission: number
}
