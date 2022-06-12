import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TrisFilters } from '../../forms/trisFiltersForm';
import { Tris } from '../../models/tri';

@Component({
  selector: 'tris-table',
  templateUrl: './tris-table.component.html',
  styleUrls: ['./tris-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisTableComponent implements OnInit {

  @Output() filtersChanged = new EventEmitter();


  data: { tris: Tris, filters: TrisFilters } = {
    filters: new TrisFilters,
    tris: { items: [], metadata: null },
  }

  @Input() set tris( tris: Tris ) {
    this.data.tris = { ...tris };
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
      }
    }
    else {
      filters.ordering_direction = 'ASC';
    }

    this.onFiltersChanged( filters as TrisFilters );
  }

}
