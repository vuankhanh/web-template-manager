import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductGalleryVideoModifyPage } from '../../../pages/main/gallery-video/product-gallery-video-modify/product-gallery-video-modify.page';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductGalleryVideoResponse, ProductGalleryVideoService } from 'src/app/services/api/product-gallery-video.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-gallery-video',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductGalleryVideoComponent implements OnInit, OnDestroy {
  productGalleryVideoResponse: ProductGalleryVideoResponse;
  productGalleryVideos: Array<ProductGalleryVideo>;

  configPagination: PaginationParams;

  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
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
      );
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGalleryVideo(this.configPagination);
  }

  async navigatorToModify(type: 'update'| 'insert', productGalleryVideo: ProductGalleryVideo){
    const modal = await this.modalController.create({
      component: ProductGalleryVideoModifyPage,
      componentProps: {
        type,
        data: Object.assign({}, productGalleryVideo)
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <ProductGalleryVideo>data.data.data
      }

      if(type === 'insert'){
        this.productGalleryVideos.push(params.data);
      }else if(type==='update'){
        for(let [index, productCategory] of this.productGalleryVideos.entries()){
          if(productCategory._id === params.data._id){
            this.productGalleryVideos[index] = params.data;
          }
        }
      }
    }
  }

  removeProductGallery(productGallery: ProductGalleryVideo){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryVideoService.remove(tokenStoraged.accessToken, productGallery).subscribe(res=>{
          let index = this.productGalleryVideos.findIndex(productGallery=>productGallery._id === res._id);
          if(index>=0){
            this.productGalleryVideos.splice(index, 1);
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
  data: ProductGalleryVideo
}
