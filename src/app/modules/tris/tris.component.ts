import { AfterViewInit,  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
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
export class TrisComponent implements OnInit, OnDestroy {

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
    ) { }

  ngOnInit(): void {
    let a;
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete()
  }


  index = ( filters: TrisFiltersModel = new TrisFiltersModel ) => {

    // Affiche le spinner
    this.spinner.show();

    this.client.index( filters )
      .pipe(
        // Cache le spinner
        finalize(() => this.spinner.hide())
      )
      .subscribe(
        (response: any ) => {
          this.data.tris = new TrisModel(response);
          this.cdRef.markForCheck();
        }
    );

  }


  /**
   * @listens TrisFilters#filtersChanged
   * @param filters Filtres de recherche
   */
  onFiltersChanged( filters: TrisFiltersModel ): void {
    this.index(filters);
  }

}
