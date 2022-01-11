import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';

import { PaginationParams } from '../../Interfaces/PaginationParams';

import { ImageAlbumWillUpload, ProductGallery } from '../../Interfaces/ProductGallery';

@Injectable({
  providedIn: 'root'
})
export class ProductGalleryService {
  private urlGetAll: string = hostConfiguration.host+'/product-gallery';
  private urlInsert: string = hostConfiguration.host+'/product-gallery/insert';
  private urlUpdate: string = hostConfiguration.host+'/product-gallery/update';
  private urlRemove: string = hostConfiguration.host+'/product-gallery/remove';
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
    return this.httpClient.get<ProductGalleryResponse>(this.urlGetAll, { headers, params })
  }

  getDetail(token: string, id: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    
    return this.httpClient.get<ProductGallery>(this.urlGetAll+'/'+id, { headers });
  }

  insert(token: string, imageAlbumWillUpload: ImageAlbumWillUpload){
    console.log(imageAlbumWillUpload);
    
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', imageAlbumWillUpload.name);

    let formData = new FormData();
    for(let media of imageAlbumWillUpload.willUpload){
      formData.append('many-files', media)
    }

    formData.append('isMain', imageAlbumWillUpload.isMain.toString())

    return this.httpClient.post<ProductGallery>(this.urlInsert, formData, { headers, params });
  }

  update(token: string, id: string, imageAlbumWillUpload: ImageAlbumWillUpload){
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', imageAlbumWillUpload.name);
    params = params.append('_id', id);

    let formData = new FormData();
    for(let media of imageAlbumWillUpload.willUpload){
      formData.append('many-files', media);
    }

    if(imageAlbumWillUpload.mediaWillBeDeleted?.length){
      let mediaWillBeDeleted = imageAlbumWillUpload.mediaWillBeDeleted;
      formData.append('mediaWillBeDeleted', JSON.stringify(mediaWillBeDeleted));
    }

    formData.append('isMain', imageAlbumWillUpload.isMain.toString());

    return this.httpClient.put<ProductGallery>(this.urlUpdate, formData, { headers, params });
  }

  remove(token: string, productGallery: ProductGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ProductGallery | null>(this.urlRemove, productGallery, { headers });
  }
}

export interface ProductGalleryResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<ProductGallery>
}


