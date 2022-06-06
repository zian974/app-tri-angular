import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Input, ViewChild, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';

import { Taxon } from './taxref.model';
import { TaxrefService } from './taxref.service';

@Component({
  selector: 'app-taxref',
  templateUrl: './taxref.component.html',
  styleUrls: ['./taxref.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxrefComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formInput!: FormControl;

  @Input() multiple!: Boolean;

  @Input() set selectedTaxon( bota: any ) {
    this.data.selectedTaxon = {...bota};
    this.cdRef.markForCheck();
  }

  @ViewChild('agentsForm') ngForm!: NgForm;


  public data = {
    Taxa: [] as Taxon[],
    selectedTaxon: {} as Taxon,
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
          return this.taxrefSvc.autocomplete( filters );
        }),
      )

    this.formChangesSubscription$.subscribe( (response: any) => {

      console.log(response)
      if ( response._embedded && response._embedded.taxa.length > 0 ) {

    console.log(this.data)
        this.data.Taxa = [...response._embedded.taxa ];

this.data.Taxa.forEach( (el: Taxon) => {
  let str:string = el.referenceNameHtml;
  // let reg =nex RegExp(/<i>/)
  let test = str.match(/(<i>(.*)<\/i>)/);
  // let split: string[] = [...(str.match("(<i>.*</i>)")) as [] ];
  console.log(test)
})

        this.data.states.listVisible = true;
      }
      this.cdRef.markForCheck();
    });

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


  onClick = ( taxon: Taxon ) => {
    if ( !(this.formInput.value as number[]).includes(taxon.id as number) ) {
      this.formInput.value.push( taxon.id );
      this.data.selectedTaxon = taxon;
    }

   this.data.filters.term = "";
    this.toggleList();
  }


  onRemove = ( index: number ) => {
    let agentId: number = this.data.selectedTaxon.id as number;

    let value: number[] = this.formInput.value;
    value = value.filter( el => el !== agentId );
    this.formInput.setValue(value);

    // this.data.selectedTaxon.splice(index, 1);
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
