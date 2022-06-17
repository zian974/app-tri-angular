import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, Subscription, throwError } from "rxjs"

export class Http {

  public httpStart$ = new Subject();
  public httpEnd$ = new Subject();

  handleError = () => {
    return ( error: HttpErrorResponse): Observable<any> => {
      return throwError( error );
    }
  }
}
