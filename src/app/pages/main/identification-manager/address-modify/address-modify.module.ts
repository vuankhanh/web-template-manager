import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressModifyPageRoutingModule } from './address-modify-routing.module';

import { AddressModifyPage } from './address-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddressModifyPageRoutingModule
  ],
  declarations: [AddressModifyPage]
})
export class AddressModifyPageModule {}
