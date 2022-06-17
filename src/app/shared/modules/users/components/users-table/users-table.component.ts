import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/shared/models/page.model';
import { populateFilters } from '../../actions/users.actions';
import { UsersFiltersModel } from '../../models/users-filters.model';
import { UsersModel } from '../../models/users.model';


/**
 * @module UsersTablesComponent
 * @event module:UsersTablesComponent~filtersChanged
 */

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {

  @Input() set users( users: UsersModel ) {
    this.data.users = new UsersModel(users);
    this.makePagination();
  }

  @Output() filtersChanged = new EventEmitter();

  /** Données publiques du composant */
  data: { users: UsersModel, filters: UsersFiltersModel, pagination: Page[] } = {
    filters: new UsersFiltersModel,
    users: new UsersModel,
    pagination: []
  }

  constructor(
    private store: Store) { }

  ngOnInit(): void {
  }


  /**
   * @fires module:UsersTableComponent~filtersChanged
   * @param filters Critères de recherche d'un user
   */
  onFiltersChanged( filters: UsersFiltersModel ): void {
    this.data.filters = { ...this.data.filters, ...filters };
    this.filtersChanged.emit(filters);
  }


  /**
   * Pagination de la requête
   */
  onPaginate( page: number ): void {
    let pagination = {
      limit: this.data.filters.limit,
      limit_start: page * this.data.filters.limit
    }
    this.onFiltersChanged(pagination as UsersFiltersModel);

    // On enregistre les filtres dans le store
    this.store.dispatch( populateFilters({ ...this.data.filters, ...pagination } ) );
  }


  /**
   * Ordonnancement de la requête
   */
  onSort( field: string ) {
    let filters = { ordering_column: field, ordering_direction: '' };
    if ( this.data.filters.ordering_column === field ) {
      switch( this.data.filters.ordering_direction ) {
        case "ASC":
          filters.ordering_direction = "DESC";
          break;

        case "DESC":
          filters.ordering_direction = "";
          filters.ordering_column = "";
          break;

        default:
          filters.ordering_direction = "ASC";
          break;
      }
    }
    else {
      filters.ordering_direction = 'ASC';
    }

    this.onFiltersChanged( filters as UsersFiltersModel );
  }


  makePagination() {

    this.data.pagination = [];

    let nbPage: number = Math.ceil(this.data.users.metadata.totalItems / this.data.filters.limit);

    for ( let i = 0; i < nbPage; i++) {
      let page = new Page({ num: i });
      page.label = i + 1 + "";

      if ( page.num == Math.floor( this.data.filters.limit_start / this.data.filters.limit ) ) {
        page.liClass += " active";
      }
      this.data.pagination.push( page );
    }

    let prev = new Page({
      label: '\x26laquo;',
    });
    prev.aClass = Math.floor( this.data.filters.limit_start / this.data.filters.limit ) == 0?'disabled':'';
    prev.ariaLabel = 'Précédent';
    this.data.pagination.unshift(prev);

    let next = new Page({
      num: Math.floor(this.data.users.metadata.totalItems/this.data.filters.limit),
      label: '\x26raquo;',
    });
    next.aClass = this.data.users.metadata.totalItems - ((this.data.filters.limit_start)*this.data.filters.limit) > 0?'':'disabled';
    next.ariaLabel = 'Suivant';
    this.data.pagination.push(next);

  }
}
