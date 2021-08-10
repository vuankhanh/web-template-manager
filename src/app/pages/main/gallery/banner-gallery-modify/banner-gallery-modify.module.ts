import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerGalleryModifyPageRoutingModule } from './banner-gallery-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { BannerGalleryModifyPage } from './banner-gallery-modify.page';
import { ShowImageModule } from '../../../../components/gallery/show-image/show-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BannerGalleryModifyPageRoutingModule,
    GalleryRouteModule,
    ShowImageModule
  ],
  declarations: [
    BannerGalleryModifyPage
  ]
})
export class BannerGalleryModifyPageModule {}
