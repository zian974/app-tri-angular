import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toUrlParams } from 'src/app/shared/utils/toUrlParams';
import { TaxrefFilters, TaxrefHttpResponse } from './taxref.model';

@Injectable()
export class TaxrefService {

  constructor(
    private http: HttpClient) { }

  /**
   * Récupération de la liste des agents
   *
   * @returns
   */
   autocomplete = ( filters: TaxrefFilters|null = null ): Observable<TaxrefHttpResponse> => {

    let params =  toUrlParams(filters);
    let url = 'https://taxref.mnhn.fr/api/taxa/autocomplete';
    url = params ? url + '?' + params:url;

    return this.http.get<TaxrefHttpResponse>(url)
      .pipe(
        catchError( this.handleError() )
      );
  }


  handleError = () => {

    return ( error: HttpErrorResponse): Observable<any> => {
      return throwError( error );
    }
  }
}
