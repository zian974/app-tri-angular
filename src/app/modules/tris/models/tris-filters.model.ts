/**
 * Filtres de recherche
 */
export class TrisFiltersModel {

  id?: number;

  /** Nom botanique recherché */
  nom_botanique: string = '';

  /** Colonne sur laquelle s'effectue l'ordonnacement */
  ordering_column: string = '';

  /** Direction de l'ordonnacement: ASC ou DESC */
  ordering_direction: string='';

  /** Nombre maximum d'items à récupérer */
  limit: number = 25;

  /** Index de départ pour la pagination */
  limit_start: number = 0;

  constructor( data?:Partial<TrisFiltersModel> ) {
    Object.assign(this, data);
  }
}

