export interface Agent {

  id: number|null;
  nom: string;
  prenom: string;
  email: string;
  abbr: string;

}


export class AgentModel {

  id: number;
  nom: string;
  prenom: string;
  email: string;
  abbr: string;

  constructor( data: any = {} ) {
    this.id = data.id || null;
    this.nom = data.nom || null;
    this.prenom = data.prenom || null;
    this.email = data.email || null;
    this.abbr = data.abbr || null;
  }

}
