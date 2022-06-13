import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrisFilters } from '../forms/trisFiltersForm';
import { TrisState } from './tris.state';

export const tris = createFeatureSelector<TrisState>('tris');
export const trisFilters = createSelector(
  tris,
  ( tris: TrisState ) => {
    return tris.filters;
  }
);


