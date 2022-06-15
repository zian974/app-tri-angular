export interface User {
  id: number|null;
  nom: string;
  prenom: string;
  email: string;
  abbr: string;
}


export class UserModel {

  id?: number;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  abbr: string = '';

  constructor( data?: Partial<UserModel> ) {
    Object.assign(this, data);
  }

}
