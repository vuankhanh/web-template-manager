import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryVideoPage } from './gallery-video.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryVideoPage
  },
  {
    path: 'product-gallery-modify',
    loadChildren: () => import('../product-gallery-video-modify/product-gallery-video-modify.module').then( m => m.ProductGalleryVideoModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryVideoPageRoutingModule {}
