import { createAction, props } from '@ngrx/store';
import { TrisFiltersModel } from '../models/tris-filters.model';

export const populateFilters = createAction(
  '[Tris List] Populate filters',
  props<TrisFiltersModel>()
);
