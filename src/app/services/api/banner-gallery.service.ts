import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from 'src/environments/environment';

import { BannerGallery } from 'src/app/Interfaces/BannerGallery';
import { Media } from 'src/app/Interfaces/ProductGallery';

import { map } from 'rxjs/operators';

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
    return this.httpClient.get<Array<BannerGallery>>(this.urlGetAll, { headers }).pipe(
      map(bannerGallerys=>{
        console.log(bannerGallerys);
        
        return bannerGallerys.map(bannerGallery=>{
          
          let mainMedia = this.getMainSrc(bannerGallery.media);
          if(mainMedia){
            return { ...bannerGallery, src: mainMedia.src, thumbnail: mainMedia.srcThumbnail }
          }else{
            return { ...bannerGallery, src: '', thumbnail: '' }
          }
        });
      })
    );;
  }

  insert(token: string, bannerGallery: BannerGallery){
    console.log(bannerGallery);
    
    let headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token
    });

    let params: HttpParams = new HttpParams();
    params = params.append('name', bannerGallery.name);

    let formData = new FormData();
    if(bannerGallery.willUpload){
      for(let i=0; i<bannerGallery.willUpload.length; i++){
        if(i === 0){
          delete bannerGallery.willUpload[i].base64;
          formData.append('single-file', bannerGallery.willUpload[i]);
        }
      }
    }

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
    if(bannerGallery.willUpload){
      for(let i=0; i<bannerGallery.willUpload.length; i++){
        if(i === 0){
          delete bannerGallery.willUpload[i].base64;
          formData.append('single-file', bannerGallery.willUpload[i]);
        }
      }
    }

    let mediaString = bannerGallery.media ? JSON.stringify(bannerGallery.media) : "[]";
    formData.append('oldMedia', mediaString);

    return this.httpClient.put<BannerGallery>(this.urlUpdate, formData, { headers, params });
  }

  remove(token: string, bannerGallery: BannerGallery){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<BannerGallery | null>(this.urlRemove, bannerGallery, { headers });
  }

  getMainSrc(medias: Array<Media>): Src{
    let index: number = medias.findIndex(me=>me.isMain);
    return index>0 ? medias[index] : medias[0];
  }
}

interface Src{
  src: string,
  srcThumbnail: string
}
