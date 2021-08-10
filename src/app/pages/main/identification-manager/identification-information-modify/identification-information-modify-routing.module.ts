import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationInformationModifyPage } from './identification-information-modify.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificationInformationModifyPage
  },
  {
    path: 'address-modify',
    loadChildren: () => import('../address-modify/address-modify.module').then( m => m.AddressModifyPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificationInformationModifyPageRoutingModule {}
