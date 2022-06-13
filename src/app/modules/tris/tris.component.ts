import { AfterViewInit,  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { populateFilters } from './actions/tris.actions';
import { tris, trisFilters } from './actions/tris.selector';
import { TrisFilters } from './forms/trisFiltersForm';
import { TriModel, Tris, TrisModel } from './models/tri';
import { TrisService } from './services/tris.service';

@Component({
  selector: 'app-tris',
  templateUrl: './tris.component.html',
  styleUrls: ['./tris.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisComponent implements OnInit, AfterViewInit, OnDestroy {

  private onComponentDestroy$ = new Subject;

  public data: { tris: TrisModel, filters: TrisFilters|null } = {
    tris: new TrisModel,
    filters: null
  }

  constructor(
      private cdRef: ChangeDetectorRef,
      private client : TrisService,
      private route: ActivatedRoute,
      private store: Store
    ) { }

  ngOnInit(): void {

  }


  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete()
  }


  ngAfterViewInit() {
      this.cdRef.markForCheck();
    this.store.select(trisFilters)
    .pipe(
      take(1)
    )
    .subscribe( (e) => {
      this.data.filters = { ...e };
      this.cdRef.detectChanges();
    })
  }


  index = ( filters: TrisFilters|null = null ) => {
    this.client.index( filters )
      .pipe(
        finalize(() => true)
      )
      .subscribe(
        (response: any ) => {
          this.data.tris = new TrisModel(response);
          this.cdRef.markForCheck();
        }
    );
  }


  onFiltersChanged( filters: TrisFilters ): void {
    this.store.dispatch( populateFilters(filters) );
    this.index(filters);
  }

}
