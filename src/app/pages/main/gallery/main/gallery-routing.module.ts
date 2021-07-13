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
  },
  {
    path: 'banner-gallery-modify',
    loadChildren: () => import('../banner-gallery-modify/banner-gallery-modify.module').then( m => m.BannerGalleryModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule {}
