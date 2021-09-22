import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderProcessingPage } from './order-processing.page';

const routes: Routes = [
  {
    path: '',
    component: OrderProcessingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderProcessingPageRoutingModule {}
