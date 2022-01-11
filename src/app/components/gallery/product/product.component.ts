import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductGalleryModifyPage } from '../../../pages/main/gallery/product-gallery-modify/product-gallery-modify.page';

import { ProductGallery } from 'src/app/Interfaces/ProductGallery';
import { PaginationParams } from '../../../Interfaces/PaginationParams';

import { ProductGalleryService, ProductGalleryResponse } from 'src/app/services/api/product-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productGalleryResponse: ProductGalleryResponse;
  productGallerys: Array<ProductGallery>;

  configPagination: PaginationParams;

  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private productGalleryService: ProductGalleryService
  ) { }

  ngOnInit() {
    this.getProductGallery();
  }
  
  getProductGallery(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          this.productGalleryResponse = res;
          this.configPagination = {
            totalItems: res.totalItems,
            page: res.page,
            size: res.size,
            totalPages: res.totalPages
          };
          this.productGallerys = this.productGalleryResponse.data;
        })
      );
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGallery(this.configPagination);
  }

  async navigatorToModify(productGallery?: ProductGallery){
    const modal = await this.modalController.create({
      component: ProductGalleryModifyPage,
      componentProps: {
        productGalleryId : productGallery ? productGallery._id : 'new'
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();

    if(data.data){
      if(productGallery){
        for(let [index, productCategory] of this.productGallerys.entries()){
          if(productCategory._id === data.data._id){
            this.productGallerys[index] = data.data;
          }
        }
      }else{
        this.productGallerys.push(data.data);
      }
    }
  }

  removeProductGallery(productGallery: ProductGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.remove(tokenStoraged.accessToken, productGallery).subscribe(res=>{
          let index = this.productGallerys.findIndex(productGallery=>productGallery._id === res._id);
          if(index>=0){
            this.productGallerys.splice(index, 1);
          }
        })
      );
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}