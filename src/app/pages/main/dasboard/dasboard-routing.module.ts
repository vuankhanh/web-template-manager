import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DasboardPage } from './dasboard.page';

const routes: Routes = [
  {
    path: '',
    component: DasboardPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DasboardPageRoutingModule {}
