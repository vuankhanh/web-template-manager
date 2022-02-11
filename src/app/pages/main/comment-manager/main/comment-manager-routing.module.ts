import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentManagerPage } from './comment-manager.page';

const routes: Routes = [
  {
    path: '',
    component: CommentManagerPage
  },
  {
    path: 'comment-processing/:commentId',
    loadChildren: () => import('../comment-processing/comment-processing.module').then( m => m.CommentProcessingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentManagerPageRoutingModule {}
