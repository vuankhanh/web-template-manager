import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from 'src/environments/environment';

import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

@Injectable({
  providedIn: 'root'
})
export class BannerGalleryService {
  private urlGetAll: string = hostConfiguration.host+'/banner-gallery';
  private urlInsert: string = hostConfiguration.host+'/banner-gallery/insert';
  private urlUpdate: string = hostConfiguration.host+'/banner-gallery/update';
  private urlRemove: string = hostConfiguration.host+'/banner-gallery/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string){

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<Array<BannerGallery>>(this.urlGetAll, { headers });
  }

  insert(token: string, bannerGallery: BannerGallery){
    console.log(bannerGallery);
    
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', bannerGallery.name);

    let formData = new FormData();
    formData.append('single-file', bannerGallery.willUpload);

    return this.httpClient.post<BannerGallery>(this.urlInsert, formData, { headers, params });
  }

  update(token: string, bannerGallery: BannerGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', bannerGallery.name);
    params = params.append('_id', bannerGallery._id);

    let formData = new FormData();
    formData.append('single-file', bannerGallery.willUpload)

    return this.httpClient.put<BannerGallery>(this.urlUpdate, formData, { headers, params });
  }

  remove(token: string, bannerGallery: BannerGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<BannerGallery | null>(this.urlRemove, bannerGallery, { headers });
  }
}
