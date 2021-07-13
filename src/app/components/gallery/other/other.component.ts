import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerGalleryModifyPage } from '../../../pages/main/gallery/banner-gallery-modify/banner-gallery-modify.page';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BannerGalleryService } from 'src/app/services/api/banner-gallery.service';

import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
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
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.get(tokenStoraged.accessToken).subscribe(res=>{

          this.bannerGallerys = res;
          // this.navigatorToModify('update', this.productGallerys[1])
          
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

      if(type === 'insert'){
        this.bannerGallerys.push(params.data);
      }else if(type==='update'){
        for(let [index, bannerGallery] of this.bannerGallerys.entries()){
          if(bannerGallery._id === params.data._id){
            this.bannerGallerys[index] = params.data;
          }
        }
      }
    }
  }

  removeProductGallery(bannerGallery: BannerGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.remove(tokenStoraged.accessToken, bannerGallery).subscribe(res=>{
          console.log(res);
          let index = this.bannerGallerys.findIndex(bannerGallery=>bannerGallery._id === res._id);
          if(!isNaN(index)){
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
