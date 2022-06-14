import { Agent } from "../../models/agent";

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

  agents!: Agent[];

  constructor( data?: Partial<TriModel> ) {

    Object.assign(this, data);

    // for( let prop in this ) {
    //   console.log(prop)
    // }


    // this.id = data.id || null;

    // // this.recolte_id = data.recolte_id || null;

    // this.num_accession = data.num_accession;
    // this.cd_ref = data.cd_ref || null;
    // this.nom_botanique = data.nom_botanique;

    // this.tri_date = data.tri_date;
    // this.tri_duree = data.tri_duree;
    // this.tri_origin = data.tri_origin;
    // this.tri_comment = data.tri_comment || null;

    // this.fruits_pds = data.fruits_pds;
    // this.fruits_nb = data.fruits_nb;
    // this.fruits_etat = data.fruits_etat;

    // this.graines_pds = data.graines_pds;
    // this.graines_100pds = data.graines_100pds || null;
    // this.graines_1000pds = data.graines_1000pds || null;
    // this.graines_nb = data.graines_nb;
    // this.graines_nb_estime = data.graines_nb_estime || null;
    // this.graines_etat = data.graines_etat;
    // this.graines_trash_pds = data.graines_trash_pds || null;
    // this.graines_trash_nb = data.graines_trash_nb || null;
    // this.graines_trash_raison = data.graines_trash_raison || null;

    // this.agents = data.agents || [];
  }

}


