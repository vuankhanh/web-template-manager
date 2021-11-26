import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductGalleryVideoModifyPage } from './product-gallery-video-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProductGalleryVideoModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductGalleryVideoModifyPageRoutingModule {}
