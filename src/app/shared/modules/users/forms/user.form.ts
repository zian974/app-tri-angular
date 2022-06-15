import { formatDate } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../models/user.model";
import { UserModel } from "../models/user.model";

export class UserForm {

  public data = {
  };

  public fg: FormGroup;

  /**
   * @property Définition dees contrôles du formulaire
   */
  private fgObject: { [key: string]: any; } = {

    /**
     * @property Id de la fiche de user
     */
    id: [ null , [ Validators.pattern('[0-9]*') ] ],

    /**
     * @property Nom de l'user
     */
    nom: [ null , [ Validators.required ] ],

    /**
     * @property Prénom de l'user
     */
    prenom: [ "", [ Validators.required ] ],

    /**
     * @property Email de l'user
     */
    email: [ "", [ Validators.required, Validators.email ] ],

    /**
     * @property Abréviation de l'user.
     *
     * - 6 caractères majuscules minimum
     */
    abbr: [ null , [Validators.required, Validators.pattern('[A-Z]{6,}') ] ],

  };


  constructor(
    private fb: FormBuilder
  ){
    this.fg = this.fb.group( this.fgObject );


  }


  /**
   * Associe les valeurs au formulaire
   *
   * @param value FormGroupOBject
   */
  public patchValue( values: UserModel ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {
        this.fg.get(key)?.setValue(value);
      }
    }

    return;
  }


  public updateValidators = ( user: UserModel|null ): void => {

    if ( user === null ) {
      return;
    }

    this.fg.updateValueAndValidity();

    return;
  }


  /*
   *
   * GETTERS/SETTERS
   *
   */
  get id() { return this.fg.get('id') as FormControl; };
  get nom() { return this.fg.get('nom') as FormControl; };
  get prenom(): FormControl { return this.fg.get('prenom') as FormControl; };
  get email(): FormControl { return this.fg.get('email') as FormControl; };
  get abbr(): FormControl { return this.fg.get('abbr') as FormControl; };
}
