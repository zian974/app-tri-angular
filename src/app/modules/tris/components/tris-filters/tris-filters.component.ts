import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer2, Output, EventEmitter, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, take, takeUntil, timeout } from 'rxjs/operators';
import { populateFilters } from '../../actions/tris.actions';
import { trisFiltersSelector } from '../../actions/tris.selector';
import { TrisFiltersForm } from '../../forms/trisFiltersForm';
import { TrisFiltersModel } from '../../models/tris-filters.model';


/**
 * @module TrisFiltersComponent
 * @event module:TrisFiltersComponent~filtersChanged
 */

@Component({
  selector: 'tris-filters',
  templateUrl: './tris-filters.component.html',
  styleUrls: ['./tris-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisFiltersComponent implements OnInit, AfterViewInit, OnDestroy {



  /**
   * EventEmitter lancé à la soumission du formulaire
   *
   * @event module:TrisFiltersComponent~onClickOutside
   */
  @Output() filtersChanged = new EventEmitter();


  public data: {
    states: {
      filtersVisible: boolean,
      countFilters: number
    }
  } = {
    states: {
      filtersVisible: false,
      countFilters: 0
    },
  };

  public filtersForm: TrisFiltersForm;
  public unlistenDocumentClick$!: Function;

  private onComponentDestroy$ = new Subject();

  constructor(
    private cdRef: ChangeDetectorRef,
    private element: ElementRef,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private store: Store
  ) {
    this.filtersForm = new TrisFiltersForm( this.fb );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.initData();

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
     * @fires module:TrisFiltersComponent~onClickOutside
     */
    this.unlistenDocumentClick$ = this.renderer.listen(document, 'click', (e: MouseEvent) => {
      this.onClickOutside(e)
    });
  }

  ngOnDestroy(): void {
      this.onComponentDestroy$.next();
      this.onComponentDestroy$.complete();
  }

  /**
   * Récupère les données avec les filtres enregistrés dans le Store
   */
   initData = (): void => {
    this.store.select(trisFiltersSelector)
      .pipe(
        take(1)
      )
      .subscribe( ( filters: TrisFiltersModel ) => {
        this.filtersForm.patchValue( filters );
        setTimeout( () => {
          this.onSubmit()
        })
      });
  }

  toggleFilters( event: MouseEvent|null = null) {
    this.data.states.filtersVisible = !this.data.states.filtersVisible;
    this.cdRef.markForCheck();
    event?.stopPropagation();
  }


  onReset() {
    this.filtersForm.nom_botanique.reset();
    this.onSubmit();
  }


  /**
   * Envoi du formualire de recherche
   *
   * @fires module:TrisFiltersComponent~filtersChanged
   */
  onSubmit(): void {
    /**
     * filtersChanged Event
     * @listens module:TrisFiltersComponent~filtersChanged
     */
    this.filtersChanged.emit(this.filtersForm.fg.value);

    // On enregistre les filtres dans le store
    this.store.dispatch( populateFilters(this.filtersForm.fg.value) );
  }


  /**
   * @listens module:TrisFiltersComponent~onClickOutside
   *
   * @param event
   */
  onClickOutside(event: MouseEvent): void {
    let filterContainer = this.element.nativeElement.querySelector('.trisFiltersContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.trisFiltersContainer').contains(event.target)) {
      this.toggleFilters( event );
    }
  }
}
