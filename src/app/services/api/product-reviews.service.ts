import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from 'src/environments/environment';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ProductReviews, ProductReviewsStatus } from 'src/app/Interfaces/ProductReviews';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {
  private urlProductReviews: string = hostConfiguration.host+'/product-reviews';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(
    token: string,
    paginationParams?: PaginationParams,
    status?: ProductReviewsStatus,
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
}

export interface ProductReviewsResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<ProductReviews>
}