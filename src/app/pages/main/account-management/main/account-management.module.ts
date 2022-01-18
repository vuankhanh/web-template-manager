import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountManagementPageRoutingModule } from './account-management-routing.module';

import { AccountManagementPage } from './account-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountManagementPageRoutingModule
  ],
  declarations: [AccountManagementPage]
})
export class AccountManagementPageModule {}
