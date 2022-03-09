import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { ProductGalleryVideoResponse, ProductGalleryVideoService } from 'src/app/services/api/product-gallery-video.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choose-gallery-video',
  templateUrl: './choose-gallery-video.page.html',
  styleUrls: ['./choose-gallery-video.page.scss'],
})
export class ChooseGalleryVideoPage implements OnInit, OnDestroy {
  productGalleryVideoResponse: ProductGalleryVideoResponse;
  productGalleryVideos: Array<ProductGalleryVideo>;

  configPagination: PaginationParams;

  private subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private productGalleryVideoService: ProductGalleryVideoService
  ) { }

  ngOnInit() {
    this.getProductGalleryVideo();
  }

  getProductGalleryVideo(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryVideoService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          this.productGalleryVideoResponse = res;
          this.configPagination = {
            totalItems: res.totalItems,
            page: res.page,
            size: res.size,
            totalPages: res.totalPages
          };
          this.productGalleryVideos = this.productGalleryVideoResponse.data;
        })
      )
    }
  }

  chooseProductGalleryVideo(productGalleryVideo: ProductGalleryVideo){
    this.modalController.dismiss(productGalleryVideo);
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGalleryVideo(this.configPagination);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
