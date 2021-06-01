import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificationInformationPageRoutingModule } from './identification-information-routing.module';

import { IdentificationInformationPage } from './identification-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentificationInformationPageRoutingModule
  ],
  declarations: [IdentificationInformationPage]
})
export class IdentificationInformationPageModule {}
