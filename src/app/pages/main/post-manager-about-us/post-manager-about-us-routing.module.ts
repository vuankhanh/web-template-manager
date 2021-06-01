import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostManagerAboutUsPage } from './post-manager-about-us.page';

const routes: Routes = [
  {
    path: '',
    component: PostManagerAboutUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostManagerAboutUsPageRoutingModule {}
