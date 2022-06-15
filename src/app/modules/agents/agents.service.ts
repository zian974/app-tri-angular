import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Http } from 'src/app/shared/utils/Http';
import { toUrlParams } from 'src/app/shared/utils/toUrlParams';
import { environment } from 'src/environments/environment';
import { AgentModel } from './models/agent.model';
import { AgentsFiltersModel } from './models/agents-filters.model';
import { Agents } from './models/agents.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService extends Http {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  /**
   * Récupération de la liste des agents
   *
   * @returns
   */
  index = ( agentsFilters?: AgentsFiltersModel  ): Observable<Agents> => {
    let params =  toUrlParams(agentsFilters);

    return this.http.get<Agents>(environment.apiUrl + '/api/agents?'+ params )
      .pipe(
        catchError( this.handleError() )
      );
  }

  get = ( id: number ): Observable<any> => {
    return this.http.get<any>(environment.apiUrl + '/api/agents/'+ id )
      .pipe(
        catchError( this.handleError() )
      );
  }

  store = ( item: AgentModel ): Observable<any> => {
    const request: Observable<any> = item.id ?
      (<any>this.http.put<any>(environment.apiUrl + '/api/agents/'+ item.id, item ) ) :
      (<any>this.http.post<any>(environment.apiUrl + '/api/agents', item ));

    this.httpStart$.next();
    return request
      .pipe(
        catchError( this.handleError() ),
        finalize( () => {
          this.httpEnd$.next();
        })
      );
  }
}
