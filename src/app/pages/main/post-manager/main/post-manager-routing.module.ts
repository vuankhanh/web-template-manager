import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostManagerPage } from './post-manager.page';
import { PostModifyPage } from '../post-modify/post-modify.page';

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
  exports: [RouterModule],
  declarations: [
    PostModifyPage
  ]
})
export class PostManagerPageRoutingModule {}
