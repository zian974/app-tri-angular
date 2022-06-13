import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer2, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TrisFiltersForm } from '../../forms/trisFiltersForm';

@Component({
  selector: 'tris-filters',
  templateUrl: './tris-filters.component.html',
  styleUrls: ['./tris-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisFiltersComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private renderer: Renderer2
  ) {
    this.filtersForm = new TrisFiltersForm( this.fb );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

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

    this.unlistenDocumentClick$ = this.renderer.listen(document, 'click', (e: MouseEvent) => {
      this.onClickOutside(e)
    });
  }

  ngOnDestroy(): void {
      this.onComponentDestroy$.next();
      this.onComponentDestroy$.complete();
  }

  toggleFilters( event: MouseEvent|null = null) {
    this.data.states.filtersVisible = !this.data.states.filtersVisible;
    this.cdRef.markForCheck();
    event?.stopPropagation();
  }


  onReset() {
    this.filtersForm.fg.reset();
    this.onSubmit();
  }


  onSubmit() {
    this.filtersChanged.emit(this.filtersForm.fg.value);
  }


  onClickOutside(event: MouseEvent) {
    let filterContainer = this.element.nativeElement.querySelector('.trisFiltersContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.trisFiltersContainer').contains(event.target)) {
      this.toggleFilters( event );
    }

  }
}
