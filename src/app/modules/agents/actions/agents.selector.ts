import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AgentsState } from './agents.state';

export const agents = createFeatureSelector<AgentsState>('agents');
export const agentsFiltersSelector = createSelector(
  agents,
  ( agents: AgentsState ) => {
    return agents.filters;
  }
);


