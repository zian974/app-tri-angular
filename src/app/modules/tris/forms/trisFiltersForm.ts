import { formatDate } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TriModel } from "../models/tri.model";
import { TrisFiltersModel } from "../models/tris-filters.model";

export class TrisFiltersForm {

  /**
   * @property fgObject Définition des contrôles du formulaire
   * @private
   */
  private fgObject: { [key: string]: any; } = {
    nom_botanique: [""],
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
  public patchValue( values: TrisFiltersModel ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {
        this.fg.get(key)?.setValue(value);
      }
    }

    return;
  }


  public updateValidators = ( tri: TriModel|null ): void => {

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
  get ordering_column(): FormControl { return this.fg.get('ordering_column') as FormControl; };
  get ordering_direction(): FormControl { return this.fg.get('ordering_direction') as FormControl; };
  get limit(): FormControl { return this.fg.get('limit') as FormControl; };
  get limit_start(): FormControl { return this.fg.get('limit_start') as FormControl; };


  // dateToYMD = (date: Date) => {
  //   var d = date.getDate();
  //   var m = date.getMonth() + 1; //Month from 0 to 11
  //   var y = date.getFullYear();
  //   return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  // }
}
