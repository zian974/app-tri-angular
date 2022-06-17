import { createReducer, on } from '@ngrx/store';
import { AgentsFiltersModel } from '../models/agents-filters.model';

import { populateFilters } from './agents.actions';
import { AgentsState } from './agents.state';

export const initialState: AgentsState = { filters: new AgentsFiltersModel };

export const agentsReducer = createReducer(
  initialState,
  on( populateFilters, (state, filters ) => {
    let newState = { ...state };
    newState.filters = { ...filters };
    return { ...newState };
  }),
);
