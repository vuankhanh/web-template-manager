import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductManagerPage } from './product-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProductManagerPage
  },
  {
    path: 'choose-posts',
    loadChildren: () => import('../choose-posts/choose-posts.module').then( m => m.ChoosePostsPageModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('../product-category/product-category.module').then( m => m.ProductCategoryPageModule)
  },
  {
    path: 'product-modify',
    loadChildren: () => import('../product-modify/product-modify.module').then( m => m.ProductModifyPageModule)
  },
  {
    path: 'choose-product-gallery',
    loadChildren: () => import('../choose-gallery/choose-gallery.module').then( m => m.ChooseGalleryPageModule)
  },
  {
    path: 'choose-banner-gallery',
    loadChildren: () => import('../choose-banner-gallery/choose-banner-gallery.module').then( m => m.ChooseBannerGalleryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagerPageRoutingModule {}
