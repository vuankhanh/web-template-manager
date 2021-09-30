import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCreatingPage } from './order-creating.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCreatingPage
  },
  {
    path: 'product-search',
    loadChildren: () => import('../modal/product-search/product-search.module').then( m => m.ProductSearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCreatingPageRoutingModule {}
