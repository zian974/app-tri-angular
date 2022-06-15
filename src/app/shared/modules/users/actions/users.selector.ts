import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const users = createFeatureSelector<UsersState>('users');
export const usersFiltersSelector = createSelector(
  users,
  ( users: UsersState ) => {
    return users.filters;
  }
);


