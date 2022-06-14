import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxrefComponent } from './taxref.component';
import { FormsModule } from '@angular/forms';
import { TaxrefService } from './taxref.service';



@NgModule({
  declarations: [
    TaxrefComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    TaxrefComponent
  ],
  providers: [
    TaxrefService
  ]
})
export class TaxrefModule { }
