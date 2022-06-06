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
  fullNameHtml: string
  id: number
  parentId: number
  referenceId: number
  referenceNameHtml: string
  scientificName: string
}

export interface TaxrefHttpResponse {
  _embedded: {
    taxa: Taxon[]
  }
}
