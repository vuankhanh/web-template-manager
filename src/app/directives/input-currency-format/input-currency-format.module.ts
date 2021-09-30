import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputCurrencyFormatDirective } from './input-currency-format.directive';

@NgModule({
  declarations: [InputCurrencyFormatDirective],
  imports: [
    CommonModule
  ],exports: [InputCurrencyFormatDirective]
})
export class InputCurrencyFormatModule { }
