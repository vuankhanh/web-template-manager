import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerGallery } from 'src/app/Interfaces/BannerGallery';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { BannerGalleryService } from 'src/app/services/api/banner-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-choose-banner-gallery',
  templateUrl: './choose-banner-gallery.page.html',
  styleUrls: ['./choose-banner-gallery.page.scss'],
})
export class ChooseBannerGalleryPage implements OnInit, OnDestroy {
  bannerGallerys: Array<BannerGallery>;

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private bannerGalleryService: BannerGalleryService
  ) { }

  ngOnInit() {
    this.getBannerGallery();
  }

  getBannerGallery(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.bannerGallerys = res;
        })
      );
    }
  }

  chooseBannerGallery(bannerGallery: BannerGallery){
    this.modalController.dismiss(bannerGallery);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
