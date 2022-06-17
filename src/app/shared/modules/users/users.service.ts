import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Http } from 'src/app/shared/utils/Http';
import { toUrlParams } from 'src/app/shared/utils/toUrlParams';
import { environment } from 'src/environments/environment';
import { UserModel } from './models/user.model';
import { UsersFiltersModel } from './models/users-filters.model';
import { Users } from './models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Http {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  /**
   * Récupération de la liste des users
   *
   * @returns
   */
  index = ( usersFilters?: UsersFiltersModel  ): Observable<Users> => {
    let params =  toUrlParams(usersFilters);

    return this.http.get<Users>(environment.apiUrl + '/api/users?'+ params )
      .pipe(
        catchError( this.handleError() )
      );
  }

  get = ( id: number ): Observable<any> => {
    return this.http.get<any>(environment.apiUrl + '/api/users/'+ id )
      .pipe(
        catchError( this.handleError() )
      );
  }

  store = ( item: UserModel ): Observable<any> => {
    const request: Observable<any> = item.id ?
      (<any>this.http.put<any>(environment.apiUrl + '/api/users/'+ item.id, item ) ) :
      (<any>this.http.post<any>(environment.apiUrl + '/api/users', item ));

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
