import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { Product } from 'src/app/Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlGetAll: string = hostConfiguration.host+'/product';
  private urlSearching: string = hostConfiguration.host+'/product/search';
  private urlInsert: string = hostConfiguration.host+'/product/insert';
  private urlUpdate: string = hostConfiguration.host+'/product/update';
  private urlRemove: string = hostConfiguration.host+'/product/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string, paginationParams?: PaginationParams){
    let params: HttpParams = new HttpParams();
    if(paginationParams){
      params = params.append('size', paginationParams?.size ? paginationParams?.size : 10);
      params = params.append('page', paginationParams?.page ? paginationParams?.page : 1);
    }

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<ProductResponse>(this.urlGetAll, { headers, params });
  }

  searching(token: string, productName: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();

    if(productName){
      params = params.append('productName', productName);
    }

    return this.httpClient.get<Array<Product>>(this.urlSearching, { headers, params });
  }

  insert(token: string, product: Product){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<Product>(this.urlInsert, product, { headers });
  }

  update(token: string, product: Product){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    console.log(product.albumVideo);
    return this.httpClient.put<Product>(this.urlUpdate, product, { headers });
  }

  remove(token: string, product: Product){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<Product | null>(this.urlRemove, product, { headers });
  }
}

export interface ProductResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<Product>
}
