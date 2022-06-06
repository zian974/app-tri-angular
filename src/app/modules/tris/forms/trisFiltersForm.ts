import { formatDate } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Tri } from "../models/tri";


export interface TrisFilters {
  nom_botanique: string|null;
}


export class TrisFiltersForm {

  /**
   * @property fgObject aka formGroupObject. Objet contenant la définition de tous les contrôles du formulaire
   * @private
   */
  private fgObject: { [key: string]: any; } = {

    nom_botanique: [ "" ],

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
  public patchValue( values:Tri ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {
        this.fg.get(key)?.setValue(value);
      }
    }

    return;
  }


  public updateValidators = ( tri: Tri|null ): void => {

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
  get nom_botanique(): FormControl { return this.fg.get('nom_botanique') as FormControl; };


  // dateToYMD = (date: Date) => {
  //   var d = date.getDate();
  //   var m = date.getMonth() + 1; //Month from 0 to 11
  //   var y = date.getFullYear();
  //   return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  // }
}
