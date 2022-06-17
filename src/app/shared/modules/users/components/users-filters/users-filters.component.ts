import { Component, OnInit, ChangeDetectionStrategy, Output, OnDestroy, ChangeDetectorRef, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { populateFilters } from '../../actions/users.actions';
import { usersFiltersSelector } from '../../actions/users.selector';
import { UsersFiltersForm } from '../../forms/users-filters.form';
import { UsersFiltersModel } from '../../models/users-filters.model';

/** Données publique du composant */
interface ComponentData {
  states: {
    filtersVisible: boolean,
    countFilters: number
  }
}

/**
 * @module UsersFiltersComponent
 * @event module:UsersFiltersComponent~filtersChanged
 */
@Component({
  selector: 'users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFiltersComponent implements OnInit, OnDestroy {

  /**
   * EventEmitter lancé à la soumission du formulaire
   *
   * @event module:UsersFiltersComponent~onClickOutside
   */
  @Output() filtersChanged = new EventEmitter();

  /** Données publiques du composant */
  data: ComponentData = {
    states: {
      filtersVisible: false,
      countFilters: 0
    },
  };

  filtersForm: UsersFiltersForm;

  private onComponentDestroy$ = new Subject();

  private unlistenDocumentClick$!: Function;


  constructor(
      private cdRef: ChangeDetectorRef,
      private element: ElementRef,
      private fb: FormBuilder,
      private renderer: Renderer2,
      private store: Store
    ) {
    this.filtersForm = new UsersFiltersForm( this.fb );
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
    this.store.select(usersFiltersSelector)
      .pipe(
        take(1)
      )
      .subscribe( ( filters: UsersFiltersModel ) => {
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
     * @fires module:UsersFiltersComponent~onClickOutside
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
   * @fires module:UsersFiltersComponent~filtersChanged
   */
  onSubmit(): void {
    /**
     * filtersChanged Event
     * @listens module:UsersFiltersComponent~filtersChanged
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
   * @listens module:UsersFiltersComponent~onClickOutside
   *
   * @param event
   */
  onClickOutside(event: MouseEvent): void {
    let filterContainer = this.element.nativeElement.querySelector('.usersFiltersContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.usersFiltersContainer').contains(event.target)) {
      this.toggleFilters( event );
    }
  }

}
