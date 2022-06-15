import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user-edit', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
