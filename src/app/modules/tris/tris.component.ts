import { AfterViewInit,  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TrisFilters } from './forms/trisFiltersForm';
import { TriModel, Tris } from './models/tri';
import { TrisService } from './services/tris.service';

@Component({
  selector: 'app-tris',
  templateUrl: './tris.component.html',
  styleUrls: ['./tris.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrisComponent implements OnInit, AfterViewInit {

  public data: { tris: Tris } = {
    tris: { items: [], metadata: null }
  }



  constructor(
      private cdRef: ChangeDetectorRef,
      private client : TrisService,
      private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.index();
  }


  index = ( filters: TrisFilters|null = null ) => {
    this.client.index( filters )
      .pipe(
        finalize(() => true)
      )
      .subscribe(
        (response: any ) => {
          this.data.tris = response;
          this.cdRef.markForCheck();
        }
    );
  }

  onFiltersChanged( filters: TrisFilters ): void {
    this.index(filters);
  }
}
