import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountManagementPage } from './account-management.page';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementPage,
  },{
    path: 'user',
    loadChildren: ()=>import('../user-management/user-management.module').then(m=>m.UserManagementPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin-management/admin-management.module').then( m => m.AdminManagementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementPageRoutingModule {}
