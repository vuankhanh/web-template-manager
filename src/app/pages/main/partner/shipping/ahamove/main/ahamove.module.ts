import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhamovePageRoutingModule } from './ahamove-routing.module';

import { AhamovePage } from './ahamove.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhamovePageRoutingModule
  ],
  declarations: [AhamovePage]
})
export class AhamovePageModule {}
