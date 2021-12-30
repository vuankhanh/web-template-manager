import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModifyUnitPage } from './product-modify-unit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductModifyUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModifyUnitPageRoutingModule {}
