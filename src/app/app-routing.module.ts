import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tris', pathMatch: 'full' },
  { path: 'tris', loadChildren: () => import('./modules/tris/tris.module').then(m => m.TrisModule) },
  { path: 'agents', loadChildren: () => import('./modules/agents/agents.module').then(m => m.AgentsModule) },
  { path: 'users', loadChildren: () => import('./shared/modules/users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
