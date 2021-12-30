import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RouteGuard } from './services/guards/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main/main.module').then( m => m.MainPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'product-modify-unit',
    loadChildren: () => import('./pages/main/product-manager/product-modify-unit/product-modify-unit.module').then( m => m.ProductModifyUnitPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
