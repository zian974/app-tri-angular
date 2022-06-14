import { AfterViewInit,  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { populateFilters } from './actions/tris.actions';
import { trisFiltersSelector } from './actions/tris.selector';
import { TrisFiltersModel } from './models/tris-filters.model';
import { TrisModel } from './models/tris.model';
import { TrisService } from './services/tris.service';


/**
 * Data du composant
 */
interface ComponentData {
  /** Données des tris */
  tris: TrisModel;

  /** Filtres de recherche des tris */
  filters: TrisFiltersModel;
}


@Component({
  selector: 'app-tris',
  templateUrl: './tris.component.html',
  styleUrls: ['./tris.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Spinner à afficher lors des requêtes HTTP
   */
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent

  /**
   * Observable à lancer à la destruction du composant pour se désinscrire des éventuelles subscriptions effectuées.
   */
  private onComponentDestroy$ = new Subject;

  /** Données publiques du composant */
  public data: ComponentData = {
    tris: new TrisModel,
    filters: new TrisFiltersModel
  }

  constructor(
      private cdRef: ChangeDetectorRef,
      private client : TrisService,
      private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete()
  }


  ngAfterViewInit() {

  }


  index = ( filters: TrisFiltersModel = new TrisFiltersModel ) => {

    this.spinner.show();
    this.client.index( filters )
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe(
        (response: any ) => {
          console.log('Response', response)
          this.data.tris = new TrisModel(response);
          this.cdRef.markForCheck();
        }
    );
  }


  onFiltersChanged( filters: TrisFiltersModel ): void {
    console.log('TrisComponent: onFiltersChanged')
    this.index(filters);
  }

}
