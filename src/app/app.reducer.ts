import { agentsReducer } from "./modules/agents/actions/agents.reducer";
import { trisReducer } from "./modules/tris/actions/tris.reducer";
import { usersReducer } from "./shared/modules/users/actions/users.reducer";

export const reducers = {
  tris: trisReducer,
  agents: agentsReducer,
  users: usersReducer
}
