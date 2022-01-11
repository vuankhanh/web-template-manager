import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModifyPageRoutingModule } from './product-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { YoutubeIdModule } from '../../../../pipes/youtube-id/youtube-id.module';

import { ProductModifyPage } from './product-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductModifyPageRoutingModule,
    GalleryRouteModule,
    YoutubeIdModule,
  ],
  declarations: [ProductModifyPage]
})
export class ProductModifyPageModule {}
