import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManagementPage } from './admin-management.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManagementPageRoutingModule {}
