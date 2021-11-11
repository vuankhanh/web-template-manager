import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';


const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { 
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dasboard/dasboard.module').then( m => m.DasboardPageModule)
      },{
        path: 'user-management',
        loadChildren: () => import('../user-management/user-management.module').then( m => m.UserManagementPageModule)
      },{
        path: 'gallery',
        loadChildren: () => import('../gallery/main/gallery.module').then( m => m.GalleryPageModule)
      },
      {
        path: 'order-manager',
        loadChildren: () => import('../order-manager/main/order-manager.module').then( m => m.OrderManagerPageModule)
      },
      {
        path: 'product-manager',
        loadChildren: () => import('../product-manager/main/product-manager.module').then( m => m.ProductManagerPageModule)
      },
      {
        path: 'post-manager',
        loadChildren: () => import('../post-manager/main/post-manager.module').then( m => m.PostManagerPageModule)
      },
      {
        path: 'identification-information',
        loadChildren: () => import('../identification-manager/identification-information/identification-information.module').then( m => m.IdentificationInformationPageModule)
      },
      {
        path: 'redirect-manager',
        loadChildren: () => import('../redirect-manager/redirect-manager.module').then( m => m.RedirectManagerPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'partner/shipping',
        loadChildren: () => import('../partner/shipping/ahamove/main/ahamove.module').then( m => m.AhamovePageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
