import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportManagementPage } from './support-management.page';

const routes: Routes = [
  {
    path: '',
    component: SupportManagementPage
  },
  {
    path: 'support-modify',
    loadChildren: () => import('../support-modify/support-modify.module').then( m => m.SupportModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportManagementPageRoutingModule {}
