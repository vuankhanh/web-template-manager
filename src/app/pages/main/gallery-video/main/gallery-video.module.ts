import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryVideoPageRoutingModule } from './gallery-video-routing.module';
import { YoutubeIdModule } from '../../../../pipes/youtube-id/youtube-id.module';
import { IsMainModule } from 'src/app/pipes/is-main/is-main.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { GalleryVideoPage } from './gallery-video.page';
import { ProductGalleryVideoComponent } from '../../../../components/gallery-video/product/product.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryVideoPageRoutingModule,
    YoutubeIdModule,
    IsMainModule,
    PaginationModule
  ],
  declarations: [
    GalleryVideoPage,
    ProductGalleryVideoComponent,
  ]
})
export class GalleryVideoPageModule {}
