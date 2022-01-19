import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductCategoryModifyPage } from '../product-category-modify/product-category-modify.page'

import { ProductCategory } from '../../../../Interfaces/ProductCategory';

import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit, OnDestroy {
  productCategorys: Array<ProductCategory>;

  subscription: Subscription = new Subscription();
  constructor(
    private productCategoryService: ProductCategoryService,
    private localStorageService: LocalStorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getProductCategory();
  }

  getProductCategory(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productCategoryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.productCategorys = res;
        })
      )
    }
  }

  async navigatorToModify(productCategory?: ProductCategory){
    const modal = await this.modalController.create({
      component: ProductCategoryModifyPage,
      componentProps: {
        productCategory: productCategory
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){

      if(!productCategory){
        this.productCategorys.push(data.data);
      }else{
        for(let [index, productCategory] of this.productCategorys.entries()){
          if(productCategory._id === data.data._id){
            this.productCategorys[index] = data.data;
          }
        }
      }
    }
  }

  removeProductCategory(productCategory: ProductCategory){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      this.subscription.add(
        this.productCategoryService.remove(accessToken, productCategory).subscribe(res=>{
          let index = this.productCategorys.findIndex(productCategory=>productCategory._id === res._id);
          if(index>=0){
            this.productCategorys.splice(index, 1);
          }
        })
      );
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
