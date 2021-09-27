import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCreatingPageRoutingModule } from './order-creating-routing.module';

import { OrderCreatingPage } from './order-creating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCreatingPageRoutingModule
  ],
  declarations: [OrderCreatingPage]
})
export class OrderCreatingPageModule {}
