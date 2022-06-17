import { ListMetadata } from "src/app/shared/models/list-metadata.model";
import { AgentModel } from "./agent.model";

export interface Agents {
  /**
   * Liste des agents
   */
  items: AgentModel[];

  metadata: {
    "@id": string;
    "@type": string;
    totalItems: number;
  }
}


export class AgentsModel implements Agents {

  /** Liste des fiche de tris */
  items: AgentModel[] = [];

  metadata = new ListMetadata;

  /**
   * @constructor
   *
   * @param data Données d'initialisation
   */
  constructor( data?: Partial<AgentsModel> ) {
    Object.assign(this, data);
  }

}
