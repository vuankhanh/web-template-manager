import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductModifyPage } from '../product-modify/product-modify.page';

import { Product } from '../../../../Interfaces/Product';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.page.html',
  styleUrls: ['./product-manager.page.scss'],
})
export class ProductManagerPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async navigatorToModify(type: 'update'| 'insert', productCategory: Product){
    const modal = await this.modalController.create({
      component: ProductModifyPage,
      componentProps: {
        type,
        data: productCategory
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    console.log(data);
  }
}
