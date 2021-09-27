import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../material.module';
import { ReplaceSpaceModule } from '../../../../pipes/replace-space/replace-space.module';

import { OrderManagerPageRoutingModule } from './order-manager-routing.module';

import { OrderManagerPage } from './order-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    ReplaceSpaceModule,
    OrderManagerPageRoutingModule
  ],
  declarations: [OrderManagerPage]
})
export class OrderManagerPageModule {}
