import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductGalleryVideoModifyPageRoutingModule } from './product-gallery-video-modify-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { ClipboardModule } from 'ngx-clipboard';

import { ProductGalleryVideoModifyPage } from './product-gallery-video-modify.page';
import { ShowYoutubeVideoModule } from '../../../../components/gallery-video/show-youtube-video/show-youtube-video.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductGalleryVideoModifyPageRoutingModule,
    GalleryRouteModule,
    ClipboardModule,
    ShowYoutubeVideoModule,
    PaginationModule
  ],
  declarations: [
    ProductGalleryVideoModifyPage,
  ]
})
export class ProductGalleryVideoModifyPageModule {}
