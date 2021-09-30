import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionConfirmationPageRoutingModule } from './action-confirmation-routing.module';

//Directives
import { InputOnlyNumberModule } from '../../../../../directives/input-only-number/input-only-number.module';
import { InputCurrencyFormatModule } from '../../../../../directives/input-currency-format/input-currency-format.module';

import { ActionConfirmationPage } from './action-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActionConfirmationPageRoutingModule,
    InputOnlyNumberModule,
    InputCurrencyFormatModule
  ],
  declarations: [ActionConfirmationPage]
})
export class ActionConfirmationPageModule {}
