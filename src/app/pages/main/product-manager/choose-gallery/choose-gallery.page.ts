import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductGallery } from 'src/app/Interfaces/ProductGallery';

import { PaginationParams } from '../../../../Interfaces/PaginationParams';

import { ProductGalleryService, ProductGalleryResponse } from 'src/app/services/api/product-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choose-gallery',
  templateUrl: './choose-gallery.page.html',
  styleUrls: ['./choose-gallery.page.scss'],
})
export class ChooseGalleryPage implements OnInit, OnDestroy {
  productGalleryResponse: ProductGalleryResponse;
  productGallerys: Array<ProductGallery>;

  configPagination: PaginationParams;
  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private productGalleryService: ProductGalleryService
  ) { }

  ngOnInit() {
    this.getProductGallery();
  }
  
  getProductGallery(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.productGalleryService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
        this.productGalleryResponse = res;
        this.configPagination = {
          totalItems: res.totalItems,
          page: res.page,
          size: res.size,
          totalPages: res.totalPages
        };
        this.productGallerys = this.productGalleryResponse.data;
        console.log(this.productGallerys);
      })
    }
  }

  chooseProductGallery(productGallery: ProductGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.getDetail(tokenStoraged.accessToken, productGallery._id).subscribe(res=>{
          this.modalController.dismiss(res);
        })
      )
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGallery(this.configPagination);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
