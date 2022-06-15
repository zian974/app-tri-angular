
export class Page {

  num: number;
  label: string = '';
  aClass: string = '';
  liClass: string = '';
  ariaLabel: string = '';

  constructor( data: any = {} ) {
    this.num = data.num !== undefined?data.num:null;
    this.label = data.label || '';
    this.liClass = data.cssClass || '';
  }
}
