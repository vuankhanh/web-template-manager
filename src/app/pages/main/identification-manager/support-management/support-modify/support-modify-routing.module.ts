import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportModifyPage } from './support-modify.page';

const routes: Routes = [
  {
    path: '',
    component: SupportModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportModifyPageRoutingModule {}
