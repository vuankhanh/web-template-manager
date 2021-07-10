import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductModifyPage } from '../product-modify/product-modify.page';

import { Product } from '../../../../Interfaces/Product';

import { ProductResponse, ProductService } from 'src/app/services/api/product.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { LocalStorageService } from 'src/app/services/local-storage.service';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.page.html',
  styleUrls: ['./product-manager.page.scss'],
})
export class ProductManagerPage implements OnInit {
  productResponse: ProductResponse;
  products: Array<Product>;
  configPagination: PaginationParams;
  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.listenProduct();
  }

  listenProduct(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.productService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
        this.productResponse = res;
        this.configPagination = {
          totalItems: this.productResponse.totalItems,
          page: this.productResponse.page,
          size: this.productResponse.size,
          totalPages: this.productResponse.totalPages
        };
        this.products = this.productResponse.data;
        console.log(this.productResponse);
      })
    }
  }

  async navigatorToModify(type: 'update'| 'insert', product: Product){
    const modal = await this.modalController.create({
      component: ProductModifyPage,
      componentProps: {
        type,
        data: product
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    console.log(data);
    if(data.data && data.data.type){

      let params: Params = {
        type: <'insert' | 'update'>data.data.type,
        data: <Product>data.data.data
      }

      if(type === 'insert'){
        this.products.push(params.data);
      }else if(type==='update'){
        for(let [index, productCategory] of this.products.entries()){
          if(productCategory._id === params.data._id){
            this.products[index] = params.data;
          }
        }
      }
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.listenProduct(this.configPagination);
  }
}
interface Params{
  type: 'insert' | 'update',
  data: Product
}