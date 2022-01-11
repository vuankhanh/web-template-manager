import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerGalleryModifyPage } from '../../../pages/main/gallery/banner-gallery-modify/banner-gallery-modify.page';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BannerGalleryService } from 'src/app/services/api/banner-gallery.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-other-gallery',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit, OnDestroy {
  bannerGallerys: Array<BannerGallery>
  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private bannerGalleryService: BannerGalleryService
  ) { }

  ngOnInit() {
    this.getProductGallery();
  }

  getProductGallery(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.bannerGallerys = res;
        })
      );
    }
  }

  async navigatorToModify(type: 'update'| 'insert', bannerGallery: BannerGallery){
    const modal = await this.modalController.create({
      component: BannerGalleryModifyPage,
      componentProps: {
        type,
        data: Object.assign({},bannerGallery)
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <BannerGallery>data.data.data
      }

      let newData;
      let mainMedia = this.bannerGalleryService.getMainSrc(params.data.media);
      if(mainMedia){
        newData = { ...params.data, src: mainMedia.src, thumbnail: mainMedia.srcThumbnail }
      }else{
        newData = { ...params.data, src: '', thumbnail: '' }
      }

      if(type === 'insert'){
        this.bannerGallerys.push(newData);
      }else if(type==='update'){
        for(let [index, bannerGallery] of this.bannerGallerys.entries()){
          if(bannerGallery._id === newData._id){
            this.bannerGallerys[index] = newData;
          }
        }
      }
    }
  }

  removeBannerGallery(bannerGallery: BannerGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.remove(tokenStoraged.accessToken, bannerGallery).subscribe(res=>{
          let index = this.bannerGallerys.findIndex(bannerGallery=>bannerGallery._id === res._id);
          if(index>=0){
            this.bannerGallerys.splice(index, 1);
          }
        })
      );
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

interface Params{
  type: 'insert' | 'update',
  data: BannerGallery
}
