import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Input, ViewChild, ChangeDetectorRef, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Taxon } from './taxref.model';
import { TaxrefService } from './taxref.service';

@Component({
  selector: 'app-taxref',
  templateUrl: './taxref.component.html',
  styles: [
    '.list-group-item { cursor: pointer}',
    '.spinner { display: none }',
    '.spinner.show { display: block }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxrefComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formInput!: FormControl;

  @Input() multiple!: Boolean;

  @Input() set selectedTaxon( taxon: Taxon ) {
    this.data.selectedTaxon = new Taxon(taxon);
    this.cdRef.markForCheck();
  }

  @Output() taxonSelected = new EventEmitter;

  @ViewChild('agentsForm') ngForm!: NgForm;


  public data = {
    Taxa: [] as Taxon[],
    selectedTaxon: new Taxon,
    states: {
      listVisible: false
    },
    filters: {
      term: "",
      size: 25
    }
  }

  public unlistenDocumentClick$!: Function;

  public formChangesSubscription$!: Observable<any>;

  private onComponentDestroy$ = new Subject();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private taxrefSvc : TaxrefService,
    private cdRef: ChangeDetectorRef,
    private element: ElementRef,
    private renderer: Renderer2,) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.formChangesSubscription$ = this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this.onComponentDestroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter( (filters: any ) => {
          return filters.term && filters.term.length >= 3;
        }),
        switchMap( filters => {
          this._elementRef.nativeElement.querySelector('.spinner')?.classList.add('show');
          return this.taxrefSvc.autocomplete( filters ).pipe(
            finalize( () => this._elementRef.nativeElement.querySelector('.spinner')?.classList.remove('show'))
          );
        })
      )

    this.formChangesSubscription$.subscribe(
      {
        next: (response: any) => {
          console.log(response)
          if ( response._embedded && response._embedded.taxa.length > 0 ) {
            this.data.Taxa = [...response._embedded.taxa ];
            this.data.states.listVisible = true;
          }
          this.cdRef.markForCheck();
        },
        error: (error) => {
          console.log(error)
        }
      }
    );

    this.unlistenDocumentClick$ = this.renderer.listen(document, 'click', (e: MouseEvent) => {
      this.onClickOutside(e)
    });
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }


  trackBy = ( index: number, taxon: Taxon ): number => {
    return taxon.id as number;
  }


  /**
   * Clic sur un item de la liste des taxons retournés
   * @param taxon Taxons sélectionné
   */
  onClick = ( taxon: Taxon ): void => {
    this.data.selectedTaxon = new Taxon(taxon);
    this.data.filters.term = "";
    this.toggleList();
    this.taxonSelected.next(this.data.selectedTaxon);
  }


  /**
   * Click sur le bouton de suppresion du nom botanique
   */
  onRemove = (): void => {
    this.data.selectedTaxon = new Taxon;
  }


  onClickOutside(event: MouseEvent): void {
    let filterContainer = this.element.nativeElement.querySelector('.TaxaFilterContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.TaxaFilterContainer').contains(event.target)) {
      this.toggleList( event );
    }
  }

  toggleList( event: MouseEvent|null = null): void {
    this.data.states.listVisible = !this.data.states.listVisible;
    this.cdRef.markForCheck();
    event?.stopPropagation();
  }
}
