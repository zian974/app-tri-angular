import { createReducer, on } from '@ngrx/store';
import { UsersFiltersModel } from '../models/users-filters.model';

import { populateFilters } from './users.actions';
import { UsersState } from './users.state';

export const initialState: UsersState = { filters: new UsersFiltersModel };

export const usersReducer = createReducer(
  initialState,
  on( populateFilters, (state, filters ) => {
    let newState = { ...state };
    newState.filters = { ...filters };
    return { ...newState };
  }),
);
