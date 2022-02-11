import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../material.module';
import { CommentManagerPageRoutingModule } from './comment-manager-routing.module';

import { CommentManagerPage } from './comment-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    CommentManagerPageRoutingModule
  ],
  declarations: [CommentManagerPage]
})
export class CommentManagerPageModule {}
