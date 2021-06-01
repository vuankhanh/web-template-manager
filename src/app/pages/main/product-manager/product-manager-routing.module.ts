import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductManagerPage } from './product-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProductManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagerPageRoutingModule {}
