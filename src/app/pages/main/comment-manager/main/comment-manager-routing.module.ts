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
  },
  {
    path: 'action-confirmation',
    loadChildren: () => import('../modal/action-confirmation/action-confirmation.module').then( m => m.ActionConfirmationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentManagerPageRoutingModule {}
