import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostManagerPage } from './post-manager.page';

const routes: Routes = [
  {
    path: '',
    component: PostManagerPage
  },
  {
    path: 'about-us',
    loadChildren: () => import('../post-manager-about-us/post-manager-about-us.module').then( m => m.PostManagerAboutUsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostManagerPageRoutingModule {}
