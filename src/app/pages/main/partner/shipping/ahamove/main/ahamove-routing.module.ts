import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhamovePage } from './ahamove.page';
import { HistoryPage } from '../history/history.page';
import { NewPage } from '../new/new.page';

const routes: Routes = [
  {
    path: '',
    component: AhamovePage,
    children: [
      { 
        path: '',
        redirectTo: 'history',
        pathMatch: 'full'
      },
      {
        path: 'history',
        component: HistoryPage
      },
      {
        path: 'new',
        component: NewPage
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AhamovePageRoutingModule {}
