import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminManagementModifyPageRoutingModule } from './admin-management-modify-routing.module';

import { AdminManagementModifyPage } from './admin-management-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminManagementModifyPageRoutingModule
  ],
  declarations: [AdminManagementModifyPage]
})
export class AdminManagementModifyPageModule {}
