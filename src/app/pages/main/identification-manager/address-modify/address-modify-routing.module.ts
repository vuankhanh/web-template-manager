import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressModifyPage } from './address-modify.page';

const routes: Routes = [
  {
    path: '',
    component: AddressModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressModifyPageRoutingModule {}
