import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePostsPageRoutingModule } from './choose-posts-routing.module';
import { PaginationModule } from '../../../../components/pagination/pagination.module';

import { ChoosePostsPage } from './choose-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePostsPageRoutingModule,
    PaginationModule
  ],
  declarations: [
    ChoosePostsPage
  ]
})
export class ChoosePostsPageModule {}
