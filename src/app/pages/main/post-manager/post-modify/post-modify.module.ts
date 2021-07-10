import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostModifyPageRoutingModule } from './post-modify-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { SanitizeHtmlBindingModule } from '../../../../pipes/sanitize-html-binding/sanitiza-html-binding.module';

import { PostModifyPage } from './post-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostModifyPageRoutingModule,
    NgxEditorModule,
    SanitizeHtmlBindingModule
  ],
  declarations: [
    PostModifyPage
  ]
})
export class PostModifyPageModule {}
