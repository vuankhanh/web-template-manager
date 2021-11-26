import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { Media, ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';

import { map }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductGalleryVideoService {

  private urlGetAll: string = hostConfiguration.host+'/product-gallery-video';
  private urlInsert: string = hostConfiguration.host+'/product-gallery-video/insert';
  private urlUpdate: string = hostConfiguration.host+'/product-gallery-video/update';
  private urlRemove: string = hostConfiguration.host+'/product-gallery-video/remove';
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
    return this.httpClient.get<ProductGalleryVideoResponse>(this.urlGetAll, { headers, params });
  }

  insert(token: string, productGalleryVideo: ProductGalleryVideo){
    console.log(productGalleryVideo);
    
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', productGalleryVideo.name);

    let body = {
      urls: productGalleryVideo.media,
      isMain: productGalleryVideo.isMain
    }

    return this.httpClient.post<ProductGalleryVideo>(this.urlInsert, body, { headers, params });
  }

  update(token: string, productGalleryVideo: ProductGalleryVideo){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', productGalleryVideo.name);
    params = params.append('_id', productGalleryVideo._id);

    let body = {
      urls: productGalleryVideo.media,
      isMain: productGalleryVideo.isMain
    }
    
    return this.httpClient.put<ProductGalleryVideo>(this.urlUpdate, body, { headers, params });
  }

  remove(token: string, productGallery: ProductGalleryVideo){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ProductGalleryVideo | null>(this.urlRemove, productGallery, { headers });
  }
}

export interface ProductGalleryVideoResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<ProductGalleryVideo>
}

interface Src{
  src: string,
  srcThumbnail: string
}
