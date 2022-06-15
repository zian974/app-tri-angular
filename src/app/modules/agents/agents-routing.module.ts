import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './agents.component';
import { AgentEditComponent } from './pages/agent-edit/agent-edit.component';

const routes: Routes = [
  { path: '', component: AgentsComponent },
  { path: 'agent-edit', component: AgentEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
