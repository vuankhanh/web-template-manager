import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCreatingPageRoutingModule } from './order-creating-routing.module';

//Pipe
import { GalleryRouteModule } from '../../../../pipes/gallery-route/gallery-route.module';
import { ReplaceSpaceModule } from '../../../../pipes/replace-space/replace-space.module'

//Directive
import { InputOnlyNumberModule } from '../../../../directives/input-only-number/input-only-number.module';

import { OrderCreatingPage } from './order-creating.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OrderCreatingPageRoutingModule,
    GalleryRouteModule,
    ReplaceSpaceModule,
    InputOnlyNumberModule
  ],
  declarations: [OrderCreatingPage]
})
export class OrderCreatingPageModule {}
