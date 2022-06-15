import { ListMetadata } from "src/app/shared/models/list-metadata.model";
import { UserModel } from "./user.model";

export interface Users {
  /**
   * Liste des users
   */
  items: UserModel[];

  metadata: {
    "@id": string;
    "@type": string;
    totalItems: number;
  }
}


export class UsersModel implements Users {

  /** Liste des fiche de tris */
  items: UserModel[] = [];

  metadata = new ListMetadata;

  /**
   * @constructor
   *
   * @param data Données d'initialisation
   */
  constructor( data?: Partial<UsersModel> ) {
    Object.assign(this, data);
  }

}
