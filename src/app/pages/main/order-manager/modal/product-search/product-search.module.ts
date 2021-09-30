import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSearchPageRoutingModule } from './product-search-routing.module';
import { GalleryRouteModule } from '../../../../../pipes/gallery-route/gallery-route.module';
import { ReplaceSpaceModule } from '../../../../../pipes/replace-space/replace-space.module'

import { ProductSearchPage } from './product-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSearchPageRoutingModule,
    GalleryRouteModule,
    ReplaceSpaceModule
  ],
  declarations: [ProductSearchPage]
})
export class ProductSearchPageModule {}
