import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseBannerGalleryPageRoutingModule } from './choose-banner-gallery-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { ChooseBannerGalleryPage } from './choose-banner-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseBannerGalleryPageRoutingModule,
    GalleryRouteModule
  ],
  declarations: [ChooseBannerGalleryPage]
})
export class ChooseBannerGalleryPageModule {}
