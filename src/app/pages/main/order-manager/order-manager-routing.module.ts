import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderManagerPage } from './order-manager.page';

const routes: Routes = [
  {
    path: '',
    component: OrderManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagerPageRoutingModule {}
