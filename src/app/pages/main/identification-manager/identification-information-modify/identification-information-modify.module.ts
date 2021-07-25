import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificationInformationModifyPageRoutingModule } from './identification-information-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { IdentificationInformationModifyPage } from './identification-information-modify.page';
import { AddressComponent } from '../../../../components/identification-information-modify/address/address.component';
import { LogoComponent } from '../../../../components/identification-information-modify/logo/logo.component';
import { PhoneNumberComponent } from '../../../../components/identification-information-modify/phone-number/phone-number.component';
import { SocialNetworkingComponent } from '../../../../components/identification-information-modify/social-networking/social-networking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IdentificationInformationModifyPageRoutingModule,
    GalleryRouteModule
  ],
  declarations: [
    IdentificationInformationModifyPage,
    AddressComponent,
    LogoComponent,
    PhoneNumberComponent,
    SocialNetworkingComponent
  ]
})
export class IdentificationInformationModifyPageModule {}
