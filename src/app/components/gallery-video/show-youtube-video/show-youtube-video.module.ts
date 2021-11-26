import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowYoutubeVideoComponent } from './show-youtube-video.component';
import { YoutubeIdModule } from '../../../pipes/youtube-id/youtube-id.module';
@NgModule({
  declarations: [
    ShowYoutubeVideoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    YoutubeIdModule
  ],
  exports: [
    ShowYoutubeVideoComponent,
  ]
})
export class ShowYoutubeVideoModule { }