import { createAction, props } from '@ngrx/store';
import { AgentsFiltersModel } from '../models/agents-filters.model';

export const populateFilters = createAction(
  '[Agents List] Populate filters',
  props<AgentsFiltersModel>()
);
