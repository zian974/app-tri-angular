import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserModel } from "../models/user.model";
import { UsersFiltersModel } from "../models/users-filters.model";

export class UsersFiltersForm {

  /**
   * @property Définition des contrôles du formulaire
   */
  private fgObject: { [key: string]: any; } = {
    nom: [""],
    ordering_column: [ "" ],
    ordering_direction: [ "" ],
    limit: [ 25 ],
    limit_start: [ 0 ],
  };

  public fg: FormGroup;


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
  public patchValue( values: UsersFiltersModel ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {
        this.fg.get(key)?.setValue(value);
      }
    }

    return;
  }


  public updateValidators = ( tri: UserModel|null ): void => {

    if ( tri === null ) {
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
  get nom(): FormControl { return this.fg.get('nom') as FormControl; };
  get ordering_column(): FormControl { return this.fg.get('ordering_column') as FormControl; };
  get ordering_direction(): FormControl { return this.fg.get('ordering_direction') as FormControl; };
  get limit(): FormControl { return this.fg.get('limit') as FormControl; };
  get limit_start(): FormControl { return this.fg.get('limit_start') as FormControl; };
}
