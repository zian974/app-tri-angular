import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Http } from 'src/app/shared/utils/Http';
import { toUrlParams } from 'src/app/shared/utils/toUrlParams';
import { environment } from 'src/environments/environment';
import { TriModel } from '../models/tri.model';
import { TrisFiltersModel } from '../models/tris-filters.model';
import { Tris } from '../models/tris.model';

@Injectable({
  providedIn: 'root'
})
export class TrisService extends Http {

  constructor(
      private http: HttpClient
    ) {
      super();
    }

  /**
   * Récupération de la liste des tris
   *
   * @returns
   */
  index = ( trisFilters?: TrisFiltersModel  ): Observable<Tris> => {
    let params =  toUrlParams(trisFilters);

    return this.http.get<Tris>(environment.apiUrl + '/api/tris?'+ params )
      .pipe(
        catchError( this.handleError() )
      );
  }

  get = ( id: number ): Observable<any> => {
    return this.http.get<any>(environment.apiUrl + '/api/tris/'+ id )
      .pipe(
        catchError( this.handleError() )
      );
  }

  store = ( item: TriModel ): Observable<any> => {
    const request: Observable<any> = item.id ?
      (<any>this.http.put<any>(environment.apiUrl + '/api/tris/'+ item.id, item ) ) :
      (<any>this.http.post<any>(environment.apiUrl + '/api/tris', item ));

    this.httpStart$.next();
    return request
      .pipe(
        catchError( this.handleError() ),
        finalize( () => {
          this.httpEnd$.next();
        })
      );
  }


  handleError = () => {

    return ( error: HttpErrorResponse): Observable<any> => {
      return throwError( error );
    }
  }
}
