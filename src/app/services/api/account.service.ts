import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private changePasswordUrl: string = hostConfiguration.host+'/account/change-password';
  constructor(
    private httpClient: HttpClient
  ) { }

  changePassword(token: string, confirmPassword: ConfirmPassword){
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    return this.httpClient.put(this.changePasswordUrl, confirmPassword, { headers });
  }
}

export interface ConfirmPassword{
  oldPassword: string,
  password: string,
  confirmPassword: string
}
