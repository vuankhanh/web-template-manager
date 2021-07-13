import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerGalleryModifyPage } from './banner-gallery-modify.page';

const routes: Routes = [
  {
    path: '',
    component: BannerGalleryModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerGalleryModifyPageRoutingModule {}
