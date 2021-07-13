import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePostsPageRoutingModule } from './choose-posts-routing.module';

import { ChoosePostsPage } from './choose-posts.page';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePostsPageRoutingModule
  ],
  declarations: [
    ChoosePostsPage,
    PaginationComponent
  ]
})
export class ChoosePostsPageModule {}
