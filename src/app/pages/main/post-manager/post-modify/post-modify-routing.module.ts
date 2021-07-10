import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostModifyPage } from './post-modify.page';

const routes: Routes = [
  {
    path: '',
    component: PostModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostModifyPageRoutingModule {}
