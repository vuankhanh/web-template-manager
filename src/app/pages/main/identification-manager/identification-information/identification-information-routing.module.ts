import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationInformationPage } from './identification-information.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificationInformationPage
  },
  {
    path: 'identification-modify',
    loadChildren: () => import('../identification-information-modify/identification-information-modify.module').then( m => m.IdentificationInformationModifyPageModule)
  },
  {
    path: 'support-management',
    loadChildren: () => import('../support-management/main/support-management.module').then( m => m.SupportManagementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificationInformationPageRoutingModule {}
