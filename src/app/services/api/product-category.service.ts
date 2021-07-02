import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductCategory } from '../../Interfaces/ProductCategory';

import { hostConfiguration } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private urlGetAll: string = hostConfiguration.host+'/product-category';
  private urlInsert: string = hostConfiguration.host+'/product-category/insert';
  private urlUpdate: string = hostConfiguration.host+'/product-category/update';
  private urlRemove: string = hostConfiguration.host+'/product-category/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<Array<ProductCategory>>(this.urlGetAll, { headers });
  }

  insert(token: string, productCategory: ProductCategory){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ProductCategory>(this.urlInsert, productCategory, { headers });
  }

  update(token: string, productCategory: ProductCategory){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ProductCategory>(this.urlUpdate, productCategory, { headers });
  }

  remove(token: string, productCategory: ProductCategory){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ProductCategory | null>(this.urlRemove, productCategory, { headers });
  }

}
