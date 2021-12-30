import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModifyUnitPageRoutingModule } from './product-modify-unit-routing.module';

import { ProductModifyUnitPage } from './product-modify-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductModifyUnitPageRoutingModule
  ],
  declarations: [ProductModifyUnitPage]
})
export class ProductModifyUnitPageModule {}
