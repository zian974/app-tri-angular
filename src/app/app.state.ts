import { AgentsFiltersModel } from "./modules/agents/models/agents-filters.model";
import { TrisFiltersModel } from "./modules/tris/models/tris-filters.model";
import { UsersFiltersModel } from "./shared/modules/users/models/users-filters.model";

export const appState = {
  tris:  {
    filters: new TrisFiltersModel
  },
  agents:  {
    filters: new AgentsFiltersModel
  },
  users:  {
    filters: new UsersFiltersModel
  }
}
