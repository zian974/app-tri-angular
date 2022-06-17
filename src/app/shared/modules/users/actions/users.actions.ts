import { createAction, props } from '@ngrx/store';
import { UsersFiltersModel } from '../models/users-filters.model';

export const populateFilters = createAction(
  '[Users List] Populate filters',
  props<UsersFiltersModel>()
);
