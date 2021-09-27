import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionConfirmationPageRoutingModule } from './action-confirmation-routing.module';

import { ActionConfirmationPage } from './action-confirmation.page';

//Directives
import { InputOnlyNumberDirective } from '../../../../../directives/input-only-number.directive';
import { InputCurrencyFormatDirective } from '../../../../../directives/input-currency-format.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActionConfirmationPageRoutingModule
  ],
  declarations: [
    ActionConfirmationPage,
    InputOnlyNumberDirective,
    InputCurrencyFormatDirective,
  ]
})
export class ActionConfirmationPageModule {}
