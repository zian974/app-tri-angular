export class FiltersModel {

  /** Colonne sur laquelle s'effectue l'ordonnacement */
  ordering_column: string = '';

  /** Direction de l'ordonnacement: ASC ou DESC */
  ordering_direction: string='';

  /** Nombre maximum d'items à récupérer */
  limit: number = 25;

  /** Index de départ pour la pagination */
  limit_start: number = 0;

}
