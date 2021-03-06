import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModifyPageRoutingModule } from './product-modify-routing.module';

import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { YoutubeIdModule } from '../../../../pipes/youtube-id/youtube-id.module';
import { ConfirmPasswordPageModule } from 'src/app/components/confirm-password/confirm-password.module';
import { ProductModifyUnitPageModule } from '../product-modify-unit/product-modify-unit.module';

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
    ConfirmPasswordPageModule,
    ProductModifyUnitPageModule,
  ],
  declarations: [ProductModifyPage]
})
export class ProductModifyPageModule {}
