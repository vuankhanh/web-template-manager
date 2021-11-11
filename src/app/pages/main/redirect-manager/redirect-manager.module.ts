import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedirectManagerPageRoutingModule } from './redirect-manager-routing.module';

import { RedirectManagerPage } from './redirect-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedirectManagerPageRoutingModule
  ],
  declarations: [RedirectManagerPage]
})
export class RedirectManagerPageModule {}
