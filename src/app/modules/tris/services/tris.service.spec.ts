import { TestBed } from '@angular/core/testing';

import { TrisService } from './tris.service';

describe('TrisService', () => {
  let service: TrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
