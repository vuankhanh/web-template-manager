import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostManagerAboutUsPageRoutingModule } from './post-manager-about-us-routing.module';
import { NgxEditorModule } from 'ngx-editor';

import { PostManagerAboutUsPage } from './post-manager-about-us.page';

//Pipes
import { SanitizeHtmlBindingPipe } from '../../../pipes/sanitize-html-binding.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostManagerAboutUsPageRoutingModule,
    NgxEditorModule
  ],
  declarations: [
    PostManagerAboutUsPage,
    SanitizeHtmlBindingPipe
  ]
})
export class PostManagerAboutUsPageModule {}
