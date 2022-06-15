import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersFiltersComponent } from './components/users-filters/users-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './pages/user-edit/user-edit.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersFiltersComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule,
    UsersRoutingModule,
    SpinnerModule
  ]
})
export class UsersModule { }
