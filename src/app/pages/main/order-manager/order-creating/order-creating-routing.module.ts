import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCreatingPage } from './order-creating.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCreatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCreatingPageRoutingModule {}
