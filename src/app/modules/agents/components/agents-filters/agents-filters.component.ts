import { Component, OnInit, ChangeDetectionStrategy, Output, OnDestroy, ChangeDetectorRef, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { populateFilters } from '../../actions/agents.actions';
import { agentsFiltersSelector } from '../../actions/agents.selector';
import { AgentsFiltersForm } from '../../forms/agents-filters.form';
import { AgentsFiltersModel } from '../../models/agents-filters.model';

/** Données publique du composant */
interface ComponentData {
  states: {
    filtersVisible: boolean,
    countFilters: number
  }
}

/**
 * @module AgentsFiltersComponent
 * @event module:AgentsFiltersComponent~filtersChanged
 */
@Component({
  selector: 'agents-filters',
  templateUrl: './agents-filters.component.html',
  styleUrls: ['./agents-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsFiltersComponent implements OnInit, OnDestroy {

  /**
   * EventEmitter lancé à la soumission du formulaire
   *
   * @event module:AgentsFiltersComponent~onClickOutside
   */
  @Output() filtersChanged = new EventEmitter();

  /** Données publiques du composant */
  data: ComponentData = {
    states: {
      filtersVisible: false,
      countFilters: 0
    },
  };

  filtersForm: AgentsFiltersForm;

  private onComponentDestroy$ = new Subject();

  private unlistenDocumentClick$!: Function;


  constructor(
      private cdRef: ChangeDetectorRef,
      private element: ElementRef,
      private fb: FormBuilder,
      private renderer: Renderer2,
      private store: Store
    ) {
    this.filtersForm = new AgentsFiltersForm( this.fb );
  }

  ngOnInit(): void {
    this.initData();
    this.addEvents();
  }

  ngOnDestroy(): void {
      this.onComponentDestroy$.next();
      this.onComponentDestroy$.complete();
  }

  /**
   * Récupère les données avec les filtres enregistrés dans le Store
   */
   initData = (): void => {
    this.store.select(agentsFiltersSelector)
      .pipe(
        take(1)
      )
      .subscribe( ( filters: AgentsFiltersModel ) => {
        this.filtersForm.patchValue( filters );
        setTimeout( () => {
          this.onSubmit()
        })
      });
  }


  /**
   * Ajout d'évènements au composant.
   *
   * - filtersForm.valueChange
   * - onClickOutside
   */
  addEvents() {

    this.filtersForm.fg.valueChanges
      .pipe(
        takeUntil(this.onComponentDestroy$)
      )
      .subscribe(
        (str: string) => {
          let values = this.filtersForm.fg.value;
          let buffer = 0;
          for( let filter in values ){

            if ( ['fulltext', 'limit'].includes(filter) ) {
              continue;
            };

            if( (values[filter] !== "" && values[filter] != null) ) {
              buffer += 1;
            }
          }
          this.data.states.countFilters = buffer;
          this.cdRef.markForCheck();
        }
      );

    /**
     * @fires module:AgentsFiltersComponent~onClickOutside
     */
    this.unlistenDocumentClick$ = this.renderer.listen(document, 'click', (e: MouseEvent) => {
      this.onClickOutside(e)
    });

  }


  /**
   * Affiche/Masque le formualire de recherche
   *
   * @param event MouseEvent
   */
  toggleFilters( event: MouseEvent|null = null): void {
    this.data.states.filtersVisible = !this.data.states.filtersVisible;
    this.cdRef.markForCheck();
    event?.stopPropagation();
  }


  /**
   * Envoi du formulaire de recherche
   *
   * @fires module:AgentsFiltersComponent~filtersChanged
   */
  onSubmit(): void {
    /**
     * filtersChanged Event
     * @listens module:AgentsFiltersComponent~filtersChanged
     */
    this.filtersChanged.emit(this.filtersForm.fg.value);

    // On enregistre les filtres dans le store
    this.store.dispatch( populateFilters(this.filtersForm.fg.value) );

  }


  /**
   * Reset du formulaire de recherche
   */
  onReset() {
    this.filtersForm.nom.reset();
    this.onSubmit();
  }


  /**
   * Evénement au click à l'extérieur du block des filtres:
   *
   * -ferme les filtres
   *
   * @listens module:AgentsFiltersComponent~onClickOutside
   *
   * @param event
   */
  onClickOutside(event: MouseEvent): void {
    let filterContainer = this.element.nativeElement.querySelector('.agentsFiltersContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.agentsFiltersContainer').contains(event.target)) {
      this.toggleFilters( event );
    }
  }

}
