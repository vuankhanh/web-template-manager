import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientAuthentication } from 'src/app/Interfaces/ClientAuthentication';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private urlGetAll: string = hostConfiguration.host+'/user-management';
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
}

export interface UserManagementResponse{
  page: number,
  size: number,
  totalItems: number,
  totalPages: number,
  data: Array<ClientAuthentication>
}
