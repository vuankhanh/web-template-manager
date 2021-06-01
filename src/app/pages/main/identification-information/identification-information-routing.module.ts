import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationInformationPage } from './identification-information.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificationInformationPage
  },
  {
    path: ':param',
    loadChildren: () => import('../identification-information-detail/identification-information-detail.module').then( m => m.IdentificationInformationDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificationInformationPageRoutingModule {}
