import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { AgentsService } from './agents.service';
import { AgentsFiltersModel } from './models/agents-filters.model';
import { AgentsModel } from './models/agents.model';

/**
 * Data du composant
 */
 interface ComponentData {
  /** Données des agents */
  agents: AgentsModel;

  // /** Filtres de recherche des agents */
  // filters: AgentsFiltersModel;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsComponent implements OnInit, OnDestroy {

  /** Données publiques du composant */
  public data: ComponentData = {
    agents: new AgentsModel
  }

  /**
   * Subject utilisé pour se désinscrire d'éventuelles subscriptions
   */
  private onComponentDestroy$ = new Subject;

  /**
   * Spinner à afficher lors des requêtes HTTP
   */
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent


  constructor(
    private cdRef: ChangeDetectorRef,
    private client : AgentsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.onComponentDestroy$.next();
      this.onComponentDestroy$.complete();
  }


  /**
   * @listens TrisFilters#filtersChanged
   * @param filters Filtres de recherche
   */
  onFiltersChanged( filters: AgentsFiltersModel ): void {
    this.index(filters);
  }


  /**
   * Récupère la liste des agents en fonction des filtres passés en paramètres
   *
   * @param filters Filtres de recherche
   */
  index = ( filters: AgentsFiltersModel = new AgentsFiltersModel ) => {

    this.spinner.show();

    this.client.index( filters )
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe(
        (response: any ) => {
          this.data.agents = new AgentsModel(response);
          this.cdRef.markForCheck();
        }
    );

  }

}
