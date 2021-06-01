import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DasboardPageRoutingModule } from './dasboard-routing.module';

import { DasboardPage } from './dasboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DasboardPageRoutingModule
  ],
  declarations: [DasboardPage]
})
export class DasboardPageModule {}
