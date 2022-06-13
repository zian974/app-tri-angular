import { createReducer, on } from '@ngrx/store';

import { populateFilters } from './tris.actions';
import { TrisFilters } from '../forms/trisFiltersForm';
import { TrisState } from './tris.state';

export const initialState: TrisState = { filters: new TrisFilters };

export const trisReducer = createReducer(
  initialState,
  on( populateFilters, (state, filters ) => {
    let newState = { ...state };
    newState.filters = { ...filters };
    return { ...newState };
  }),
);
