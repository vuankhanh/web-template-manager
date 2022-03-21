import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Support, SupportDetail } from 'src/app/Interfaces/Support';
import { hostConfiguration } from 'src/environments/environment';

import { LocalStorageService } from '../local-storage.service';
import { ResponseLogin } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private urlGetAll: string = hostConfiguration.host+'/support-management';
  private urlInsert: string = hostConfiguration.host+'/support-management/insert';
  private urlUpdate: string = hostConfiguration.host+'/support-management/update';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getAll(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': tokenStoraged.accessToken
    });

    return this.httpClient.get<Array<Support>>(this.urlGetAll, { headers });
  }

  getDetail(id: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': tokenStoraged.accessToken
    });

    return this.httpClient.get<SupportDetail>(this.urlGetAll+'/'+id, { headers });
  }

  insert(supportWillUpload: SupportWillUpload){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': tokenStoraged.accessToken
    });

    return this.httpClient.post<Array<Support>>(this.urlInsert, supportWillUpload, { headers });
  }

  update(id: string, supportWillUpload: SupportWillUpload){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': tokenStoraged.accessToken
    });

    let params: HttpParams = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.put<Array<Support>>(this.urlUpdate, supportWillUpload, { headers, params });
  }
}

export interface SupportWillUpload{
  name: string,
  postsId: string
}