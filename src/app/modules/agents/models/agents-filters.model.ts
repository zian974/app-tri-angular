import { FiltersModel } from "src/app/shared/models/filters.model";

export class AgentsFiltersModel extends FiltersModel {

  id?: number;

  /** Nom recherché */
  nom: string = '';


  constructor( data?:Partial<AgentsFiltersModel> ) {
    super();
    Object.assign(this, data);
  }
}
