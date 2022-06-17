import { formatDate } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Agent } from "../models/agent.model";
import { AgentModel } from "../models/agent.model";

export class AgentForm {

  public data = {
  };

  public fg: FormGroup;

  /**
   * @property Définition dees contrôles du formulaire
   */
  private fgObject: { [key: string]: any; } = {

    /**
     * @property Id de la fiche de agent
     */
    id: [ null , [ Validators.pattern('[0-9]*') ] ],

    /**
     * @property Nom de l'agent
     */
    nom: [ null , [ Validators.required ] ],

    /**
     * @property Prénom de l'agent
     */
    prenom: [ "", [ Validators.required ] ],

    /**
     * @property Email de l'agent
     */
    email: [ "", [ Validators.required, Validators.email ] ],

    /**
     * @property Abréviation de l'agent.
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
  public patchValue( values: AgentModel ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {
        this.fg.get(key)?.setValue(value);
      }
    }

    return;
  }


  public updateValidators = ( agent: AgentModel|null ): void => {

    if ( agent === null ) {
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
