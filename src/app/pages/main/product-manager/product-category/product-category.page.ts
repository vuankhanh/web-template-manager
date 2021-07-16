import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductCategoryModifyPage } from '../product-category-modify/product-category-modify.page'

import { ProductCategory } from '../../../../Interfaces/ProductCategory';

import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
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
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productCategoryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.productCategorys = res;
        })
      )
    }
  }

  async navigatorToModify(type: 'update'| 'insert', productCategory: ProductCategory){
    console.log(type);
    console.log(productCategory);
    const modal = await this.modalController.create({
      component: ProductCategoryModifyPage,
      componentProps: {
        type,
        data: productCategory
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <ProductCategory>data.data.data
      }

      if(type === 'insert'){
        this.productCategorys.push(params.data);
      }else if(type==='update'){
        for(let [index, productCategory] of this.productCategorys.entries()){
          if(productCategory._id === params.data._id){
            this.productCategorys[index] = params.data;
          }
        }
      }
    }
  }

  removeProductCategory(productCategory: ProductCategory){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
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

interface Params{
  type: 'insert' | 'update',
  data: ProductCategory
}
