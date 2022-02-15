import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from 'src/environments/environment';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ProductReviews, ProductReviewsCodeStatus } from 'src/app/Interfaces/ProductReviews';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {
  private urlProductReviews: string = hostConfiguration.host+'/product-reviews';
  private bProductReviewsChange: BehaviorSubject<ProductReviews> = new BehaviorSubject(null);
  private productReviewsChange$: Observable<ProductReviews> = this.bProductReviewsChange.asObservable();
  constructor(
    private httpClient: HttpClient
  ) {}

  get(
    token: string,
    paginationParams?: PaginationParams,
    status?: ProductReviewsCodeStatus,
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

    return this.httpClient.get<ProductReviewsResponse>(this.urlProductReviews, { headers, params });
  }

  setProductReviewsChange(productReviews: ProductReviews){
    this.bProductReviewsChange.next(productReviews);
  }

  getProductReviewsChange(){
   return this.productReviewsChange$;
  }

  getDetail(
    token: string,
    id: string
  ){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<ProductReviews>(this.urlProductReviews+'/'+id, { headers });
  }

  changeStatus(
    token: string,
    id: string,
    newStatus: ProductReviewsCodeStatus
  ){

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.put<ProductReviews>(this.urlProductReviews+'/'+id+'/changeStatus', { newStatus }, { headers });
  }
}

export interface ProductReviewsResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<ProductReviews>
}