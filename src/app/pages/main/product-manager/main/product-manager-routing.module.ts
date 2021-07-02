import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductManagerPage } from './product-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProductManagerPage
  },
  {
    path: 'product-category',
    loadChildren: () => import('../product-category/product-category.module').then( m => m.ProductCategoryPageModule)
  },
  {
    path: 'product-modify',
    loadChildren: () => import('../product-modify/product-modify.module').then( m => m.ProductModifyPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagerPageRoutingModule {}
