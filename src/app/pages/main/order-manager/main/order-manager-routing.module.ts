import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderManagerPage } from './order-manager.page';

const routes: Routes = [
  {
    path: '',
    component: OrderManagerPage,
  },{
    path: 'order-processing/:oderId',
    loadChildren: () => import('../order-processing/order-processing.module').then( m => m.OrderProcessingPageModule)
  },
  {
    path: 'action-confirmation',
    loadChildren: () => import('../modal/action-confirmation/action-confirmation.module').then( m => m.ActionConfirmationPageModule)
  },
  {
    path: 'order-creating',
    loadChildren: () => import('../order-creating/order-creating.module').then( m => m.OrderCreatingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagerPageRoutingModule {}
