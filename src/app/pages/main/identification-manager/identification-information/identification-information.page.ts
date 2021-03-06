import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IdentificationInformationModifyPage } from '../identification-information-modify/identification-information-modify.page';

import { Identification } from 'src/app/Interfaces/Identification';

import { IdentificationService } from 'src/app/services/api/identification.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-identification-information',
  templateUrl: './identification-information.page.html',
  styleUrls: ['./identification-information.page.scss'],
})
export class IdentificationInformationPage implements OnInit, OnDestroy {
  identification: Identification;
  editIcon: string = 'pencil';

  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private identificationService: IdentificationService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.listenIdentification();
  }

  listenIdentification(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.identificationService.getAll(tokenStoraged.accessToken).subscribe(res=>{
          this.identification = res;
        })
      )
    }
  }

  async modify(param: 'logo' | 'phoneNumber' | 'socialNetworking' | 'address' | 'support'){
    const modal = await this.modalController.create({
      component: IdentificationInformationModifyPage,
      componentProps: {
        type: param,
        identification: this.identification
      }
    });
    modal.present();

    const data = await modal.onDidDismiss();
    if(data.data){
      this.identification = data.data;
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
