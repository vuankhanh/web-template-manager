import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { IsMainModule } from 'src/app/pipes/is-main/is-main.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { GalleryPage } from './gallery.page';
import { ProductComponent } from '../../../../components/gallery/product/product.component';
import { OtherComponent } from '../../../../components/gallery/other/other.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    GalleryRouteModule,
    IsMainModule,
    PaginationModule
  ],
  declarations: [
    GalleryPage,
    ProductComponent,
    OtherComponent
  ]
})
export class GalleryPageModule {}
