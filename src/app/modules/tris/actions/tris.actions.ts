import { createAction, props } from '@ngrx/store';
import { TrisFilters } from '../forms/trisFiltersForm';

export const populateFilters = createAction(
  '[Tris List] Populate filters',
  props<TrisFilters>()
);
