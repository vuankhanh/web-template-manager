import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostManagerPageRoutingModule } from './post-manager-routing.module';

import { PostManagerPage } from './post-manager.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostManagerPageRoutingModule
  ],
  declarations: [
    PostManagerPage
  ]
})
export class PostManagerPageModule {}
