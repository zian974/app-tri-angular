import { Subject, Subscription } from "rxjs"

export class Http {

  public httpStart$ = new Subject();
  public httpEnd$ = new Subject();

}
