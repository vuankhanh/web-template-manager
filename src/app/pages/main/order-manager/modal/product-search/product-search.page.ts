import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Interfaces/Product';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { ProductService } from 'src/app/services/api/product.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})
export class ProductSearchPage implements OnInit {

  products: Array<Product>;

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private productService: ProductService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  onSearch(value: string){
    if(value){
      let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged){
        this.subscription.add(
          this.productService.searching(tokenStoraged.accessToken, value).subscribe(res=>{
            this.products = res;
          },err=>alert('Đã có lỗi xảy ra '+err))
        )
      }
    }else{
      this.products = [];
    }
  }

}
