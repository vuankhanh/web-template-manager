import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationInformationModifyPage } from './identification-information-modify.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificationInformationModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificationInformationModifyPageRoutingModule {}
