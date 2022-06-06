import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tris', pathMatch: 'full' },
  { path: 'tris', loadChildren: () => import('./modules/tris/tris.module').then(m => m.TrisModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
