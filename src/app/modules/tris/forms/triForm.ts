import { formatDate } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Agent } from "../../models/agent";
import { Tri } from "../models/tri";


export interface TrisFilters {
  nom_botanique: string|null;
}


export class TriForm {

  public data = {
    triEtats: [
      { lbl: 'mature', value: 'M', checked: false },
      { lbl: 'immature', value: 'I', checked: false }
    ]
  };


  /**
   * @property Ng FormGroup du formulaire
   */
  public fg: FormGroup;

  /**
   * @property fgObject aka formGroupObject. Objet contenant la définition de tous les contrôles du formulaire
   */
  private fgObject: { [key: string]: any; } = {

    /**
     * @property Id de la fiche de tri
     */
    id: [ null , [ Validators.pattern('[0-9]*') ] ],

    /**
     * @property cd_ref du taxon
     */
    cd_ref: [ null , [ Validators.pattern('[0-9]*') ] ],

    /**
     * @property Nom botanique de l'espèce triées
     */
    nom_botanique: [ "", [Validators.required,] ],

    /**
     * @property Numéro d'accession
     */
    num_accession: [ "", [Validators.required, Validators.pattern('^(WS|WV|CS|CV|BS) [0-9]+-[0-9]*$')] ],

    /**
     * @property Date du tri
     */
    tri_date: [ null , [Validators.required, Validators.pattern('([0-9]{4}-[0-9]{2}-[0-9]{2}(.*))?') ] ],

    /**
     * @property Date du tri
     */
    tri_duree: [ null , [Validators.required, Validators.pattern('[0-9]{2}:[0-9][05]') ] ],

    /**
     * @property Origin du lot trier
     */
    tri_origin: [ null , [Validators.required] ],

    /**
     * @property Origin du lot trier
     */
    tri_origin_other: [ null , [] ],

    /**
     * @property Agent(s) ayant effectué(s) le tri
     */
    agents: [ [], [Validators.required] ],

    /**
     * @property Etats du lot de fruit à trier
     */
    // fruits_etat: this.fb.group({
    //   mature: [ false ],
    //   immature: [ false ]
    // }),
    fruits_etat: new FormArray([]),

    /**
     * @property Poids de fruits récoltés
     */
    fruits_pds: [ null , [ Validators.required, Validators.pattern('[0-9]*\.[0-9]{3,4}') ] ],

    /**
     * @property Nombre de fruits récoltés
     */
    fruits_nb: [ null , [ Validators.required, Validators.pattern('[0-9]*') ] ],

    /**
     * @property Poids de graines récoltées
     */
    graines_pds: [ null , [ Validators.required, Validators.pattern('[0-9]*\.[0-9]{3,4}') ] ],

    /**
     * @property Poids de 100 graines récoltées
     */
    graines_100pds: [ null , [ Validators.pattern('[0-9]*\.[0-9]{3,4}') ] ],

    /**
     * @property Poids de 1000 graines récoltées
     */
    graines_1000pds: [ null , [ Validators.pattern('[0-9]*\.[0-9]{3,4}') ] ],

    /**
     * @property Nombre de graines récoltées
     */
    graines_nb: [ null , [ Validators.required, Validators.pattern('[0-9]*') ] ],

    /**
     * @property Nombre de graines récoltées estimées
     */
    graines_nb_estime: [ null , [ Validators.required, Validators.pattern('[0-9]*') ] ],

    /**
     * @property Poids de graines mises au rebut
     */
    graines_trash_pds: [ null , [ Validators.required, Validators.pattern('[0-9]*\.[0-9]{3,4}') ] ],

    /**
     * @property Nombre de graines mises au rebut
     */
    graines_trash_nb: [ null , [ Validators.required, Validators.pattern('[0-9]*') ] ],

    /**
     * @property Raison de la mise au rebut
     */
    graines_trash_raison: [ null , [] ],

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
  public patchValue( values: Tri ): void {

    for ( let [key, value] of Object.entries( values ) ) {
      if ( this.fg.get(key) ) {

        if ( 'tri_date' == key && value !== null) {
          value = formatDate(value, 'yyyy-MM-dd', 'fr-FR');
        }

        if( 'agents' == key && value !== null ) {
          let agents: number[] = []
          value.forEach((element:Agent) => {
            agents.push(element.id as number);
          });
          this.agents.setValue(agents)

          continue;
        }

        if ( 'fruits_etat' == key ) {
          let etats: string[] = value.split(",");
          etats.map( (etat, index) => {
            let idx: number = this.data.triEtats.findIndex( (el) => el.value === etat);
            if ( idx !== -1 ) this.data.triEtats[idx].checked = true;
            this.fruits_etat.push( new FormControl(etat) );
          })

          continue;
        }

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
  get id() { return this.fg.get('id') as FormControl; };
  get cd_ref() { return this.fg.get('cd_ref') as FormControl; };
  get nom_botanique(): FormControl { return this.fg.get('nom_botanique') as FormControl; };
  get num_accession(): FormControl { return this.fg.get('num_accession') as FormControl; };
  get tri_date(): FormControl { return this.fg.get('tri_date') as FormControl; };
  get tri_duree(): FormControl { return this.fg.get('tri_duree') as FormControl; };
  get tri_origin(): FormControl { return this.fg.get('tri_origin') as FormControl; };
  get tri_origin_other(): FormControl { return this.fg.get('tri_origin_other') as FormControl; };

  get fruits_etat(): FormArray { return this.fg.get('fruits_etat') as FormArray; };
  get fruits_pds(): FormControl { return this.fg.get('fruits_pds') as FormControl; };
  get fruits_nb(): FormControl { return this.fg.get('fruits_nb') as FormControl; };

  get graines_pds(): FormControl { return this.fg.get('graines_pds') as FormControl; };
  get graines_100pds(): FormControl { return this.fg.get('graines_100pds') as FormControl; };
  get graines_1000pds(): FormControl { return this.fg.get('graines_1000pds') as FormControl; };
  get graines_nb(): FormControl { return this.fg.get('graines_nb') as FormControl; };
  get graines_nb_estime(): FormControl { return this.fg.get('graines_nb_estime') as FormControl; };
  get graines_trash_pds(): FormControl { return this.fg.get('graines_trash_pds') as FormControl; };
  get graines_trash_nb(): FormControl { return this.fg.get('graines_trash_nb') as FormControl; };
  get graines_trash_raison(): FormControl { return this.fg.get('graines_trash_raison') as FormControl; };

  get agents(): FormControl { return this.fg.get('agents') as FormControl; };
  // dateToYMD = (date: Date) => {
  //   var d = date.getDate();
  //   var m = date.getMonth() + 1; //Month from 0 to 11
  //   var y = date.getFullYear();
  //   return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  // }
}
