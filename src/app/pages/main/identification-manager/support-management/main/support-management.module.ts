import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportManagementPageRoutingModule } from './support-management-routing.module';

import { SupportManagementPage } from './support-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportManagementPageRoutingModule
  ],
  declarations: [SupportManagementPage]
})
export class SupportManagementPageModule {}
