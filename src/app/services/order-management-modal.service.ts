import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ActionConfirmationPage } from '../pages/main/order-manager/modal/action-confirmation/action-confirmation.page';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementModalService {

  constructor(
    private modalController: ModalController
  ) { }

  async open(){
    const modal = await this.modalController.create({
      component: ActionConfirmationPage
    });
    modal.present();
    return await modal.onDidDismiss();
  }
}
