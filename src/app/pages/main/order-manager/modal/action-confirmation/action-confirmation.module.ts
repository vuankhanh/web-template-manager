import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionConfirmationPageRoutingModule } from './action-confirmation-routing.module';

import { ActionConfirmationPage } from './action-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionConfirmationPageRoutingModule
  ],
  declarations: [ActionConfirmationPage]
})
export class ActionConfirmationPageModule {}
