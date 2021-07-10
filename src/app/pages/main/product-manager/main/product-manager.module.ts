import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductManagerPageRoutingModule } from './product-manager-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { ProductManagerPage } from './product-manager.page';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductManagerPageRoutingModule,
    GalleryRouteModule
  ],
  declarations: [
    ProductManagerPage,
    PaginationComponent
  ]
})
export class ProductManagerPageModule {}
