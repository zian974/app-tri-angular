import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsSelectComponent } from './agents-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AgentsSelectComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    AgentsSelectComponent
  ]
})
export class AgentsSelectModule { }
