import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManagementModifyPage } from './admin-management-modify.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManagementModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManagementModifyPageRoutingModule {}
