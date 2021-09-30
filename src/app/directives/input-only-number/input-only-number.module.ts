import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputOnlyNumberDirective } from './input-only-number.directive';

@NgModule({
  declarations: [InputOnlyNumberDirective],
  imports: [
    CommonModule
  ],exports: [InputOnlyNumberDirective]
})
export class InputOnlyNumberModule { }
