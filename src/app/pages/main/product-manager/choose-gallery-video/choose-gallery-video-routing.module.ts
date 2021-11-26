import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseGalleryVideoPage } from './choose-gallery-video.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseGalleryVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseGalleryVideoPageRoutingModule {}
