import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionConfirmationPage } from './action-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ActionConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionConfirmationPageRoutingModule {}
