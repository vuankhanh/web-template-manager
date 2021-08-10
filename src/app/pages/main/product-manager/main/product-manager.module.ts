import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductManagerPageRoutingModule } from './product-manager-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { ProductManagerPage } from './product-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductManagerPageRoutingModule,
    GalleryRouteModule,
    PaginationModule
  ],
  declarations: [
    ProductManagerPage,
  ]
})
export class ProductManagerPageModule {}
