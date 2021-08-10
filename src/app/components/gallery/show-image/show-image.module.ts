import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ShowImageComponent } from './show-image.component';
import { GalleryRouteModule } from '../../../pipes/gallery-route/gallery-route.module';
@NgModule({
  declarations: [
    ShowImageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    GalleryRouteModule
  ],
  exports: [
    ShowImageComponent,
  ]
})
export class ShowImageModule { }