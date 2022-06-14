import { TriModel } from "./tri.model";

/**
 * Metadata de la liste des tris
 */
export class TrisModelMetadata {

  "@id": string = '';

  "@type": string = '';

  /** Nombre d'items total de la liste */
  "totalItems": number = 0;
}


export interface Tris {
  /** Liste des tris */
  items: TriModel[];

  /** Métadata associé à la liste (nb. totalItems) */
  metadata: TrisModelMetadata;
}

export class TrisModel implements Tris {

  /** Liste des tris */
  items: TriModel[] = [];

  /** Métadata associé à la liste (nb. totalItems) */
  metadata = new TrisModelMetadata;

  /**
   * @constructor
   *
   * @param data Données d'initialisation
   */
  constructor( data?: Partial<TrisModel> ) {
    Object.assign(this, data);
  }

}



