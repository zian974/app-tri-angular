import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TrisFilters } from '../../forms/trisFiltersForm';
import { TriModel, Tris, TrisModel } from '../../models/tri';


class Page {
  num: number;
  label: string = '';
  aClass: string = '';
  liClass: string = '';
  ariaLabel: string = '';
  constructor( data: any = {} ) {
    this.num = data.num !== undefined?data.num:null;
    this.label = data.label || '';
    this.liClass = data.cssClass || '';
  }
}


@Component({
  selector: 'tris-table',
  templateUrl: './tris-table.component.html',
  styleUrls: ['./tris-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisTableComponent implements OnInit {

  @Input() set tris( tris: Tris ) {
    this.data.tris = new TrisModel(tris);
    this.makePagination();
  }

  @Output() filtersChanged = new EventEmitter();


  data: { tris: TrisModel, filters: TrisFilters, pagination: Page[] } = {
    filters: new TrisFilters,
    tris: new TrisModel,
    pagination: []
  }


  constructor() { }


  ngOnInit(): void {
  }


  onFiltersChanged( filters: TrisFilters ): void {
    this.data.filters = { ...this.data.filters, ...filters };
    this.filtersChanged.emit(filters);
  }


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

    this.onFiltersChanged( filters as TrisFilters );
  }


  onPaginate( page: number ) {
    let pagination = {
      limit: this.data.filters.limit,
      limit_start: page * this.data.filters.limit
    }
    this.onFiltersChanged(pagination as TrisFilters);
  }


  makePagination() {

    this.data.pagination = [];

    let nbPage: number = Math.ceil(this.data.tris.metadata.totalItems / this.data.filters.limit);

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
      num: Math.floor(this.data.tris.metadata.totalItems/this.data.filters.limit),
      label: '\x26raquo;',
    });
    next.aClass = this.data.tris.metadata.totalItems - ((this.data.filters.limit_start)*this.data.filters.limit) > 0?'':'disabled';
    next.ariaLabel = 'Suivant';
    this.data.pagination.push(next);

  }

}
