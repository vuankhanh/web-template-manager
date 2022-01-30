import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {
  private urlGetAll: string = hostConfiguration.host+'/admin-management';
  private urlInsert: string = hostConfiguration.host+'/admin-management/insert';
  private urlUpdate: string = hostConfiguration.host+'/admin-management/update';
  
  private bReload: BehaviorSubject<null | ReloadValue> = new BehaviorSubject(null);
  reload$: Observable<null | ReloadValue> = this.bReload.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(token: string, paginationParams?: PaginationParams){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    if(paginationParams){
      params = params.append('size', paginationParams?.size ? paginationParams?.size : 10);
      params = params.append('page', paginationParams?.page ? paginationParams?.page : 1);
    }

    return this.httpClient.get<UserManagementResponse>(this.urlGetAll, { headers, params });
  }

  getDetail(token: string, id: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<AdminInformation>(this.urlGetAll+'/'+id, { headers });
  }

  insert(token: string, account: AdminInformation){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.post<AdminInformation>(this.urlInsert, account, { headers });
  }

  update(token: string, account: AdminInformation){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<AdminInformation>(this.urlUpdate, account, { headers });
  }

  setReload(reloadValue: ReloadValue){
    this.bReload.next(reloadValue);
  }
}
export interface UserManagementResponse{
  page: number,
  size: number,
  totalItems: number,
  totalPages: number,
  data: Array<AdminInformation>
}

export interface ReloadValue{
  status: 'update' | 'insert',
  adminInformation: AdminInformation
}