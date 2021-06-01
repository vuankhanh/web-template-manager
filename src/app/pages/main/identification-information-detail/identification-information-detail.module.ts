import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificationInformationDetailPageRoutingModule } from './identification-information-detail-routing.module';

import { IdentificationInformationDetailPage } from './identification-information-detail.page';
import { AddressComponent } from '../../../components/identification-information-detail/address/address.component';
import { LogoComponent } from '../../../components/identification-information-detail/logo/logo.component';
import { PhoneNumberComponent } from '../../../components/identification-information-detail/phone-number/phone-number.component';
import { SocialNetworkingComponent } from '../../../components/identification-information-detail/social-networking/social-networking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentificationInformationDetailPageRoutingModule
  ],
  declarations: [
    IdentificationInformationDetailPage,
    AddressComponent,
    LogoComponent,
    PhoneNumberComponent,
    SocialNetworkingComponent
  ]
})
export class IdentificationInformationDetailPageModule {}
