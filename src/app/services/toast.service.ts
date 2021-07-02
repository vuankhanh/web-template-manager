import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async shortToastSuccess(message:string, title:string){
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: 'bottom',
      duration: 3000,
      cssClass: 'toast-success'
    });
    return toast.present();
  }

  async shortToastError(message:string, title:string){
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: 'bottom',
      duration: 3000,
      cssClass: 'toast-error'
    });
    return toast.present();
  }

  async shortToastWarning(message:string, title:string){
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: 'bottom',
      duration: 3000,
      cssClass: 'toast-warning'
    });
    return toast.present();
  }
}
