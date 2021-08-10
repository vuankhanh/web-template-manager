import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostManagerPage } from './post-manager.page';

const routes: Routes = [
  {
    path: '',
    component: PostManagerPage
  },
  {
    path: 'posts-modify',
    loadChildren: () => import('../post-modify/post-modify.module').then( m => m.PostModifyPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostManagerPageRoutingModule {}
