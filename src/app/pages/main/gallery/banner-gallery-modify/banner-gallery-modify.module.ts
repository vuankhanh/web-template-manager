import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerGalleryModifyPageRoutingModule } from './banner-gallery-modify-routing.module';

import { BannerGalleryModifyPage } from './banner-gallery-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerGalleryModifyPageRoutingModule
  ],
  declarations: [BannerGalleryModifyPage]
})
export class BannerGalleryModifyPageModule {}
