import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModifyPage } from './product-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProductModifyPage
  },
  {
    path: 'choose-product-gallery',
    loadChildren: () => import('../choose-gallery/choose-gallery.module').then( m => m.ChooseGalleryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModifyPageRoutingModule {}
