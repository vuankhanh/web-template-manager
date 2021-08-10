import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PaginationComponent } from './pagination.component'
@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PaginationComponent,
  ]
})
export class PaginationModule { }