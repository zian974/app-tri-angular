import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoltesComponent } from './recoltes.component';

const routes: Routes = [{ path: '', component: RecoltesComponent }, { path: 'tris', loadChildren: () => import('../tris/tris.module').then(m => m.TrisModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoltesRoutingModule { }
