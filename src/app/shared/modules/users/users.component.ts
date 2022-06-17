import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { UsersService } from './users.service';
import { UsersFiltersModel } from './models/users-filters.model';
import { UsersModel } from './models/users.model';

/**
 * Data du composant
 */
 interface ComponentData {
  /** Données des users */
  users: UsersModel;

  // /** Filtres de recherche des users */
  // filters: UsersFiltersModel;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  /** Données publiques du composant */
  public data: ComponentData = {
    users: new UsersModel
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
    private client : UsersService,
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
  onFiltersChanged( filters: UsersFiltersModel ): void {
    this.index(filters);
  }


  /**
   * Récupère la liste des users en fonction des filtres passés en paramètres
   *
   * @param filters Filtres de recherche
   */
  index = ( filters: UsersFiltersModel = new UsersFiltersModel ) => {

    this.spinner.show();

    this.client.index( filters )
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe(
        (response: any ) => {
          this.data.users = new UsersModel(response);
          this.cdRef.markForCheck();
        }
    );

  }

}
