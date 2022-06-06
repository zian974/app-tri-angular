import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriEditComponent } from './pages/tri-edit/tri-edit.component';
import { TrisComponent } from './tris.component';

const routes: Routes = [
  { path: '', component: TrisComponent },
  { path: 'tri-edit', component: TriEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrisRoutingModule { }
