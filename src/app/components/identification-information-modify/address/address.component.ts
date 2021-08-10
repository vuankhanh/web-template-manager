import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AddressModifyPage } from '../../../pages/main/identification-manager/address-modify/address-modify.page';

import { Address } from 'src/app/Interfaces/Address';
import { Identification } from 'src/app/Interfaces/Identification';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IdentificationService } from 'src/app/services/api/identification.service';

import { Subscription } from 'rxjs';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() data: Identification;
  @Output() emitChange: EventEmitter<Identification> = new EventEmitter<Identification>();

  addresses: Array<Address>;
  isMain: number;

  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private identificationService: IdentificationService
  ) { }

  ngOnInit() {
    this.addresses = this.data.address;
    this.isMain = this.getIsMainAddress(this.addresses);
    console.log(this.addresses);
  }

  remove(index: number){
    this.addresses.splice(index, 1);
    if(this.isMain === index){
      this.isMain--;
      this.setMainAddress(this.isMain);
    }
  }

  async modify(type: 'insert' | 'update', index: number){
    const modal = await this.modalController.create({
      component: AddressModifyPage,
      componentProps: {
        data: {
          type: type,
          index: index
        },
        identification: this.data
      }
    });
    modal.present();

    const data = await modal.onDidDismiss();
    if(data.data){
      this.addresses = data.data.address;
      this.isMain = this.getIsMainAddress(this.addresses);
      this.setMainAddress(this.isMain);
      this.emitChange.emit(data.data);
      console.log(data);
      // this.identification = data.data;
    }
  }

  updateAddress(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.identificationService.updateAddress(tokenStoraged.accessToken, this.addresses).subscribe(res=>{
          this.emitChange.emit(res);
        })
      )
    }
  }

  selectChange(){
    this.setMainAddress(this.isMain);
  }
  
  setMainAddress(index: number){
    for(let i=0; i<this.addresses.length; i++){
      if(i === index){
        this.addresses[i].isHeadquarters = true
      }
      this.addresses[i].isHeadquarters = i === index ? true: false;
    }
  }

  getIsMainAddress(addresses: Array<Address>){
    let index: number = addresses.findIndex(address=> address.isHeadquarters);
    return index >=0 ? index : 0;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
