import { AgentModel } from "../../agents/models/agent.model";

export class TriModel {

  id?: number;

  // recolte_id?: number;

  num_accession!: string;

  cd_ref: number|null = null;
  nom_botanique!: string;

  tri_date!: Date;
  tri_duree!: string;
  tri_origin!: string;
  tri_comment: string = '';

  fruits_pds!: number;
  fruits_nb!: number;
  fruits_etat!: string;

  graines_pds!: number;
  graines_100pds: number|null = null;
  graines_1000pds: number|null = null;
  graines_nb!: number;
  graines_nb_estime: number|null = null;
  graines_etat!: string;
  graines_trash_pds: number|null = null;
  graines_trash_nb: number|null = null;
  graines_trash_raison: string|null = null;

  agents: AgentModel[] = [];

  constructor( data?: Partial<TriModel> ) {

    Object.assign(this, data);

  }

}


