import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderDetail } from 'src/app/Interfaces/Order';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlOrder: string = hostConfiguration.host+'/order';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(
    token: string,
    paginationParams?: PaginationParams,
    status?: string,
    createdBy?: string,
    orderCode?: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    if(paginationParams){
      params = params.append('size', paginationParams?.size ? paginationParams?.size : 10);
      params = params.append('page', paginationParams?.page ? paginationParams?.page : 1);
    }

    if(status){
      params = params.append('status', status.trim());
    }

    if(createdBy){
      params = params.append('createdBy', createdBy.trim());
    }

    if(orderCode){
      params = params.append('orderCode', orderCode.trim());
    }

    return this.httpClient.get<OrderRespone>(this.urlOrder, { headers, params })
  }

  getDetai(
    token: string,
    orderId: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<OrderDetail>(this.urlOrder+'/'+orderId, { headers })
  }
  
  revokeOrder(
    token: string,
    orderId: string,
    comments: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<OrderDetail>(this.urlOrder+'/'+orderId+'/revoke', {comments}, { headers })
  }

  confirmOrder(
    token: string,
    orderId: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<OrderDetail>(this.urlOrder+'/'+orderId+'/confirm', {}, { headers })
  }

  isComingOrder(
    token: string,
    orderId: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<OrderDetail>(this.urlOrder+'/'+orderId+'/isComing', {}, { headers })
  }

  finish(
    token: string,
    orderId: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<OrderDetail>(this.urlOrder+'/'+orderId+'/done', {}, { headers })
  }

}

export interface OrderRespone{
  page: number,
  size: number,
  totalItems: number,
  totalPages: number,
  data: Array<Order>
}
