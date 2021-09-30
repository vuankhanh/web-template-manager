import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSearchPage } from './product-search.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSearchPageRoutingModule {}
