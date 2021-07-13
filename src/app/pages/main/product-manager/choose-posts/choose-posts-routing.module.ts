import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosePostsPage } from './choose-posts.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosePostsPageRoutingModule {}
