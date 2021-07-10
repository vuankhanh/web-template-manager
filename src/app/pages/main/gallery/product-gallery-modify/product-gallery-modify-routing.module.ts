import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductGalleryModifyPage } from './product-gallery-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProductGalleryModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductGalleryModifyPageRoutingModule {}
