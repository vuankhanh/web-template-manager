import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseBannerGalleryPage } from './choose-banner-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseBannerGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseBannerGalleryPageRoutingModule {}
