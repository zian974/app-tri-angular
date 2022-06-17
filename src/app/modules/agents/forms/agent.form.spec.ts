import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AgentsFiltersForm } from './agents-filters.form';

describe('AgentsFilters', () => {
  let fb: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ]
    });

    fb = TestBed.inject(FormBuilder);
  });

  it('should create an instance', () => {
    expect(new AgentsFiltersForm( fb )).toBeTruthy();
  });
});
