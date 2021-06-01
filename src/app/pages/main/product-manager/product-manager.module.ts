import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductManagerPageRoutingModule } from './product-manager-routing.module';

import { ProductManagerPage } from './product-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductManagerPageRoutingModule
  ],
  declarations: [ProductManagerPage]
})
export class ProductManagerPageModule {}
