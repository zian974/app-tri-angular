export interface Agent {
  id: number|null;
  nom: string;
  prenom: string;
  email: string;
  abbr: string;
}


export class AgentModel {

  id?: number;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  abbr: string = '';

  constructor( data?: Partial<AgentModel> ) {
    Object.assign(this, data);
  }

}
