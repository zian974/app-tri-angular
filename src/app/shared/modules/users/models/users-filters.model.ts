import { FiltersModel } from "src/app/shared/models/filters.model";

export class UsersFiltersModel extends FiltersModel {

  id?: number;

  /** Nom recherché */
  nom: string = '';


  constructor( data?:Partial<UsersFiltersModel> ) {
    super();
    Object.assign(this, data);
  }
}
