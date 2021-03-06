import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModifyPage } from './product-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProductModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModifyPageRoutingModule {}
