import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus } from '../Interfaces/Order';

import { ActionConfirmationPage } from '../pages/main/order-manager/modal/action-confirmation/action-confirmation.page';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementModalService {

  constructor(
    private modalController: ModalController
  ) { }

  async open(newStatus: OrderStatus, order: Order){
    const modal = await this.modalController.create({
      component: ActionConfirmationPage,
      componentProps: {
        newStatus,
        order
      }
    });
    modal.present();
    return await modal.onDidDismiss();
  }
}
