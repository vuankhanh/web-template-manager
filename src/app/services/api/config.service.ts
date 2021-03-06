import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { hostConfiguration } from '../../../environments/environment';

import { Status, ServerConfig, ProductReviewsStatus } from 'src/app/Interfaces/ServerConfig';

import { BehaviorSubject, Observable } from "rxjs";
import { ProductReviewsCodeStatus } from 'src/app/Interfaces/ProductReviews';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url: string = hostConfiguration.host+'/config';

  private orderStatus: Array<Status>;
  private orderCreatedBy: Array<Status>;
  private productReviewsStatuses: Array<ProductReviewsStatus>;
  private bConfig: BehaviorSubject<ServerConfig | null> = new BehaviorSubject<ServerConfig | null>(null);
  private config$: Observable<ServerConfig | null> = this.bConfig.asObservable();
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getConfig(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<ServerConfig>(this.url, { headers: headers })
  }

  set(config: ServerConfig){
    this.orderStatus = config.orderStatus;
    this.orderCreatedBy = config.orderCreatedBy;
    this.productReviewsStatuses = config.reviewStatus;
    this.bConfig.next(config);
  }

  get(): Observable<ServerConfig>{
    return this.config$;
  }

  filterNameOrderStatus(code: string){
    if(this.orderStatus){
      let index: number = this.orderStatus.findIndex(status=>status.code === code);
      return index >=0 ? this.orderStatus[index].name : null
    }else{
      return null;
    }
  }

  filterNameOrderCreatedBy(code: string){
    if(this.orderCreatedBy){
      let index: number = this.orderCreatedBy.findIndex(createdBy=>createdBy.code === code);
      return index >=0 ? this.orderCreatedBy[index].name : null
    }else{
      return null;
    }
  }

  filterNameProductReviewsStatus(code: ProductReviewsCodeStatus){
    let index: number = this.productReviewsStatuses.findIndex(status=>status.code === code);
    return index >=0 ? this.productReviewsStatuses[index].name : null
  }
}
