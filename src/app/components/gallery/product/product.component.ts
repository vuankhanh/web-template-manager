import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductGallery } from 'src/app/Interfaces/ProductGallery';

import { ProductGalleryModifyPage } from '../../../pages/main/gallery/product-gallery-modify/product-gallery-modify.page';

import { PaginationParams } from '../../../Interfaces/PaginationParams';

import { ProductGalleryService, ProductGalleryResponse } from 'src/app/services/api/product-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
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
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    
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
          // this.navigatorToModify('update', this.productGallerys[1])
          
        })
      );
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGallery(this.configPagination);
  }

  async navigatorToModify(type: 'update'| 'insert', productGallery: ProductGallery){
    const modal = await this.modalController.create({
      component: ProductGalleryModifyPage,
      componentProps: {
        type,
        data: productGallery
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <ProductGallery>data.data.data
      }

      let mainMedia = this.productGalleryService.getMainSrc(params.data.media);
      let newData = { ...params.data, src: mainMedia.src, thumbnail: mainMedia.srcThumbnail }

      if(type === 'insert'){
        this.productGallerys.push(newData);
      }else if(type==='update'){
        for(let [index, productCategory] of this.productGallerys.entries()){
          if(productCategory._id === newData._id){
            this.productGallerys[index] = newData;
          }
        }
      }
    }
  }

  removeProductGallery(productGallery: ProductGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.remove(tokenStoraged.accessToken, productGallery).subscribe(res=>{
          console.log(res);
          let index = this.productGallerys.findIndex(productGallery=>productGallery._id === res._id);
          if(!isNaN(index)){
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

interface Params{
  type: 'insert' | 'update',
  data: ProductGallery
}