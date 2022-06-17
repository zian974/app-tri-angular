import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrisRoutingModule } from './tris-routing.module';
import { TrisComponent } from './tris.component';
import { TrisTableComponent } from './components/tris-table/tris-table.component';
import { TrisFiltersComponent } from './components/tris-filters/tris-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriEditComponent } from './pages/tri-edit/tri-edit.component';
import { AgentsSelectModule } from '../agents/modules/agents-select/agents-select.module';
import { TaxrefModule } from '../flores/modules/taxref/taxref.module';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';


@NgModule({
  declarations: [
    TrisComponent,
    TrisTableComponent,
    TrisFiltersComponent,
    TriEditComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TrisRoutingModule,

    AgentsSelectModule,
    TaxrefModule,
    SpinnerModule
  ]
})
export class TrisModule { }
