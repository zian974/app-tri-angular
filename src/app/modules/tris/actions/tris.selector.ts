import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrisState } from './tris.state';

export const tris = createFeatureSelector<TrisState>('tris');
export const trisFiltersSelector = createSelector(
  tris,
  ( tris: TrisState ) => {
    return tris.filters;
  }
);


