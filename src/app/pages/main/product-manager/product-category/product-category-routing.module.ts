import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryPage } from './product-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryPage
  },
  {
    path: 'product-category-modify',
    loadChildren: () => import('../product-category-modify/product-category-modify.module').then( m => m.ProductCategoryModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryPageRoutingModule {}
