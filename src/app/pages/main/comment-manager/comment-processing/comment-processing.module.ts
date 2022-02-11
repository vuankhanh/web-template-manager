import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentProcessingPageRoutingModule } from './comment-processing-routing.module';

import { CommentProcessingPage } from './comment-processing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentProcessingPageRoutingModule
  ],
  declarations: [CommentProcessingPage]
})
export class CommentProcessingPageModule {}
