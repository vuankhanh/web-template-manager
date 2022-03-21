import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//pipes
import { SanitizeHtmlBindingModule } from 'src/app/pipes/sanitize-html-binding/sanitiza-html-binding.module';

import { SupportModifyPageRoutingModule } from './support-modify-routing.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';

import { SupportModifyPage } from './support-modify.page';
import { ChoosePostsComponent } from '../choose-posts/choose-posts.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SanitizeHtmlBindingModule,
    SupportModifyPageRoutingModule,
    PaginationModule
  ],
  declarations: [
    SupportModifyPage,
    ChoosePostsComponent,
    PostsComponent
  ]
})
export class SupportModifyPageModule {}
