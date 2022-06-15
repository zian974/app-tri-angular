
/**
 * Metadata des listes
 */
 export class ListMetadata {

  "@id": string = '';

  "@type": string = '';

  /** Nombre d'items total de la liste */
  totalItems: number = 0;

  constructor( data?: Partial<ListMetadata> ) {
    Object.assign(this, data);
  }

}
