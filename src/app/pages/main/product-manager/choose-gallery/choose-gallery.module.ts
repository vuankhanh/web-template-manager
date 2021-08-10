import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseGalleryPageRoutingModule } from './choose-gallery-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { ChooseGalleryPage } from './choose-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseGalleryPageRoutingModule,
    GalleryRouteModule,
    PaginationModule
  ],
  declarations: [
    ChooseGalleryPage,
  ]
})
export class ChooseGalleryPageModule {}
