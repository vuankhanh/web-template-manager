import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseGalleryVideoPageRoutingModule } from './choose-gallery-video-routing.module';
import { YoutubeIdModule } from '../../../../pipes/youtube-id/youtube-id.module';
import { IsMainModule } from '../../../../pipes/is-main/is-main.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { ChooseGalleryVideoPage } from './choose-gallery-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseGalleryVideoPageRoutingModule,
    YoutubeIdModule,
    IsMainModule,
    PaginationModule
  ],
  declarations: [ChooseGalleryVideoPage]
})
export class ChooseGalleryVideoPageModule {}
