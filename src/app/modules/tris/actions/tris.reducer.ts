import { createReducer, on } from '@ngrx/store';
import { TrisFiltersModel } from '../models/tris-filters.model';

import { populateFilters } from './tris.actions';
import { TrisState } from './tris.state';

export const initialState: TrisState = { filters: new TrisFiltersModel };

export const trisReducer = createReducer(
  initialState,
  on( populateFilters, (state, filters ) => {
    let newState = { ...state };
    newState.filters = { ...filters };
    return { ...newState };
  }),
);
