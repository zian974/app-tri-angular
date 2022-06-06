import { TestBed } from '@angular/core/testing';

import { AgentsSelectService } from './agents-select.service';

describe('AgentsSelectService', () => {
  let service: AgentsSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentsSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
