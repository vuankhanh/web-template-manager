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
          console.log(this.productGallerys);
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
        data: Object.assign({},productGallery)
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <ProductGallery>data.data.data
      }

      if(type === 'insert'){
        this.productGallerys.push(params.data);
      }else if(type==='update'){
        for(let [index, productCategory] of this.productGallerys.entries()){
          if(productCategory._id === params.data._id){
            this.productGallerys[index] = params.data;
          }
        }
      }
    }
  }

  removeProductGallery(productGallery: ProductGallery){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.remove(tokenStoraged.accessToken, productGallery).subscribe(res=>{
          console.log(res);
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

interface Params{
  type: 'insert' | 'update',
  data: ProductGallery
}