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


  data: { tris: Tris } = {
    tris: { items: [], metadata: null }
  }

  @Input() set tris( tris: Tris ) {
    this.data.tris = { ...tris };
  }

  constructor() { }

  ngOnInit(): void {
  }


  onFiltersChanged( filters: TrisFilters ): void {
    this.filtersChanged.emit(filters);
  }

}
