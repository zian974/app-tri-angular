export interface TaxrefFilters {
  term: string;
  size: number;
}


export class TaxrefFiltersModel {
  term: string;
  size: number;

  constructor( data: any = {} ) {
    this.term = data.term || null;
    this.size = data.size || null;
  }
}

export interface Taxon {

}


export class Taxon {
  fullNameHtml: string = '';
  id?: number;
  parentId?: number;
  referenceId?: number;
  referenceNameHtml?: string;
  scientificName: string = '';

  public constructor(init?:Partial<Taxon>) {
    Object.assign(this, init);
  }
}


export interface TaxrefHttpResponse {
  _embedded: {
    taxa: Taxon[]
  }
}
