import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { ProductCategoryModifyPageRoutingModule } from './product-category-modify-routing.module';

import { ProductCategoryModifyPage } from './product-category-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductCategoryModifyPageRoutingModule,
  ],
  declarations: [ProductCategoryModifyPage],
  providers: [NavParams]
})
export class ProductCategoryModifyPageModule {}
