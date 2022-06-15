import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';
import { AgentsTableComponent } from './components/agents-table/agents-table.component';
import { AgentsFiltersComponent } from './components/agents-filters/agents-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentEditComponent } from './pages/agent-edit/agent-edit.component';


@NgModule({
  declarations: [
    AgentsComponent,
    AgentsTableComponent,
    AgentsFiltersComponent,
    AgentEditComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule,
    AgentsRoutingModule,
    SpinnerModule
  ]
})
export class AgentsModule { }
