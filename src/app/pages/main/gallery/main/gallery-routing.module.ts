import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPage } from './gallery.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryPage
  },
  {
    path: 'product-gallery-modify',
    loadChildren: () => import('../product-gallery-modify/product-gallery-modify.module').then( m => m.ProductGalleryModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule {}
