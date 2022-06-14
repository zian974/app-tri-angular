import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrisService } from './tris.service';
import { Tris } from '../models/tris.model';



describe('TrisService', () => {
  let service: TrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
