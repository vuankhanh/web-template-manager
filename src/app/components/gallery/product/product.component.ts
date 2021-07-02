import { Component, OnInit } from '@angular/core';
import { ProductGallery } from 'src/app/Interfaces/ProductGallery';

import { PaginationParams } from '../../../Interfaces/PaginationParams';

import { ProductGalleryService, ProductGalleryResponse } from 'src/app/services/api/product-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-product-gallery',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productGalleryResponse: ProductGalleryResponse;
  productGallerys: Array<ProductGallery>;

  configPagination: PaginationParams;
  constructor(
    private localStorageService: LocalStorageService,
    private productGalleryService: ProductGalleryService
  ) { }

  ngOnInit() {
    this.getProductGallery();
  }
  
  getProductGallery(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    
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
      })
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGallery(this.configPagination);
  }
}