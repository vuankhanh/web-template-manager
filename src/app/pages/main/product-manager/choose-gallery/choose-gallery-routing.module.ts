import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseGalleryPage } from './choose-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseGalleryPageRoutingModule {}
