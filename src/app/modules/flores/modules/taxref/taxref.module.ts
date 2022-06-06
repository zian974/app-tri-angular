import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxrefComponent } from './taxref.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaxrefComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    TaxrefComponent
  ]
})
export class TaxrefModule { }
