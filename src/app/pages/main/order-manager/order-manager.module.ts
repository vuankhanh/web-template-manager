import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderManagerPageRoutingModule } from './order-manager-routing.module';

import { OrderManagerPage } from './order-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderManagerPageRoutingModule
  ],
  declarations: [OrderManagerPage]
})
export class OrderManagerPageModule {}
