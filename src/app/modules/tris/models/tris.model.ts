import { ListMetadata } from "src/app/shared/models/list-metadata.model";
import { TriModel } from "./tri.model";

export interface Tris {
  /** Liste des fiche de tris */
  items: TriModel[];

  metadata: ListMetadata;
}

export class TrisModel implements Tris {

  /** Liste des fiche de tris */
  items: TriModel[] = [];

  metadata = new ListMetadata;

  /**
   * @constructor
   *
   * @param data Données d'initialisation
   */
  constructor( data?: Partial<TrisModel> ) {
    Object.assign(this, data);
  }

}



