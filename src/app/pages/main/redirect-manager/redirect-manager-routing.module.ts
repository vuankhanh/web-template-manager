import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedirectManagerPage } from './redirect-manager.page';

const routes: Routes = [
  {
    path: '',
    component: RedirectManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectManagerPageRoutingModule {}
