import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderProcessingPageRoutingModule } from './order-processing-routing.module';
import { MaterialModule } from '../../../../material.module';
import { ReplaceSpaceModule } from '../../../../pipes/replace-space/replace-space.module';
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';

import { OrderProcessingPage } from './order-processing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderProcessingPageRoutingModule,
    MaterialModule,
    ReplaceSpaceModule,
    GalleryRouteModule
  ],
  declarations: [OrderProcessingPage]
})
export class OrderProcessingPageModule {}
