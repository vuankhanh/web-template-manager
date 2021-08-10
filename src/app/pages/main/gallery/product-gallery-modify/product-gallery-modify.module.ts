import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductGalleryModifyPageRoutingModule } from './product-gallery-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { ClipboardModule } from 'ngx-clipboard';

import { ProductGalleryModifyPage } from './product-gallery-modify.page';
import { ShowImageModule } from '../../../../components/gallery/show-image/show-image.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductGalleryModifyPageRoutingModule,
    GalleryRouteModule,
    ClipboardModule,
    ShowImageModule,
    PaginationModule
  ],
  declarations: [
    ProductGalleryModifyPage,
  ]
})
export class ProductGalleryModifyPageModule {}
