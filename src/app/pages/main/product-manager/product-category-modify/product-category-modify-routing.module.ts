import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryModifyPage } from './product-category-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryModifyPageRoutingModule {}
