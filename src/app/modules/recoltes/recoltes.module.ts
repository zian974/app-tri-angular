import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoltesRoutingModule } from './recoltes-routing.module';
import { RecoltesComponent } from './recoltes.component';


@NgModule({
  declarations: [
    RecoltesComponent
  ],
  imports: [
    CommonModule,
    RecoltesRoutingModule
  ]
})
export class RecoltesModule { }
