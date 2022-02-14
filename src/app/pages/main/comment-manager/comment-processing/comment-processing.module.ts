import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentProcessingPageRoutingModule } from './comment-processing-routing.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { CommentProcessingPage } from './comment-processing.page';
import { RatingComponent } from 'src/app/components/rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentProcessingPageRoutingModule,
    GalleryRouteModule
  ],
  declarations: [
    CommentProcessingPage,
    RatingComponent
  ]
})
export class CommentProcessingPageModule {}
