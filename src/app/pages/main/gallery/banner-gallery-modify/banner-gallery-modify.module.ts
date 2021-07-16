import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerGalleryModifyPageRoutingModule } from './banner-gallery-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { BannerGalleryModifyPage } from './banner-gallery-modify.page';
import { ShowImageComponent } from '../../../../components/gallery/show-image/show-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BannerGalleryModifyPageRoutingModule,
    GalleryRouteModule
  ],
  declarations: [
    BannerGalleryModifyPage,
    ShowImageComponent
  ]
})
export class BannerGalleryModifyPageModule {}
