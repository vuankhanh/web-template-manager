import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';

import { PaginationParams } from '../../Interfaces/PaginationParams';

import { Media, ProductGallery } from '../../Interfaces/ProductGallery';

import { map } from 'rxjs/operators';
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
    return this.httpClient.get<ProductGalleryResponse>(this.urlGetAll, { headers, params }).pipe(map(productGallerysResponse=>{
      let data = productGallerysResponse.data.map(productGallery=>{
        let mainMedia = this.getMainSrc(productGallery.media);
        return { ...productGallery, src: mainMedia.src, thumbnail: mainMedia.srcThumbnail }
      });
      productGallerysResponse.data = data;
      return productGallerysResponse;
    }));
  }

  insert(token: string, productGallery: any){
    console.log(productGallery);
    
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', productGallery.name);

    let formData = new FormData();
    for(let media of productGallery.media){
      delete media.base64;
      formData.append('many-files', media)
    }

    formData.append('isMain', productGallery.isMain)

    return this.httpClient.post<ProductGallery>(this.urlInsert, formData, { headers, params });
  }

  update(token: string, productGallery: ProductGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ProductGallery>(this.urlUpdate, productGallery, { headers });
  }

  remove(token: string, productGallery: ProductGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ProductGallery | null>(this.urlRemove, productGallery, { headers });
  }

  getMainSrc(medias: Array<Media>): Src{
    let index: number = medias.findIndex(me=>me.isMain);
    return index ? medias[index] : medias[0];
  }
}

export interface ProductGalleryResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<ProductGallery>
}

interface Src{
  src: string,
  srcThumbnail: string
}


