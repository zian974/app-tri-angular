import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/shared/models/page.model';
import { populateFilters } from '../../actions/agents.actions';
import { AgentsFiltersModel } from '../../models/agents-filters.model';
import { AgentsModel } from '../../models/agents.model';


/**
 * @module AgentsTablesComponent
 * @event module:AgentsTablesComponent~filtersChanged
 */

@Component({
  selector: 'agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsTableComponent implements OnInit {

  @Input() set agents( agents: AgentsModel ) {
    this.data.agents = new AgentsModel(agents);
    this.makePagination();
  }

  @Output() filtersChanged = new EventEmitter();

  /** Données publiques du composant */
  data: { agents: AgentsModel, filters: AgentsFiltersModel, pagination: Page[] } = {
    filters: new AgentsFiltersModel,
    agents: new AgentsModel,
    pagination: []
  }

  constructor(
    private store: Store) { }

  ngOnInit(): void {
  }


  /**
   * @fires module:AgentsTableComponent~filtersChanged
   * @param filters Critères de recherche d'un agent
   */
  onFiltersChanged( filters: AgentsFiltersModel ): void {
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
    this.onFiltersChanged(pagination as AgentsFiltersModel);

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

    this.onFiltersChanged( filters as AgentsFiltersModel );
  }


  makePagination() {

    this.data.pagination = [];

    let nbPage: number = Math.ceil(this.data.agents.metadata.totalItems / this.data.filters.limit);

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
      num: Math.floor(this.data.agents.metadata.totalItems/this.data.filters.limit),
      label: '\x26raquo;',
    });
    next.aClass = this.data.agents.metadata.totalItems - ((this.data.filters.limit_start)*this.data.filters.limit) > 0?'':'disabled';
    next.ariaLabel = 'Suivant';
    this.data.pagination.push(next);

  }
}
