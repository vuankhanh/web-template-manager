import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../material.module';

import { AdminManagementPageRoutingModule } from './admin-management-routing.module';

import { AdminManagementPage } from './admin-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    AdminManagementPageRoutingModule
  ],
  declarations: [AdminManagementPage]
})
export class AdminManagementPageModule {}
