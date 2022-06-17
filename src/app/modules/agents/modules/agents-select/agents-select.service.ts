import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toUrlParams } from 'src/app/shared/utils/toUrlParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentsSelectService {

  constructor(
    private http: HttpClient) { }

  /**
   * Récupération de la liste des agents
   *
   * @returns
   */
   index = ( agentsFilters: any|null = null ): Observable<any> => {

    let params =  toUrlParams(agentsFilters);

    let url = environment.apiUrl + '/api/agents';
    url = params ? url + '?' + params:url;

    return this.http.get<any>(url)
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
