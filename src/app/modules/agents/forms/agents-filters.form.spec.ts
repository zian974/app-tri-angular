import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AgentForm } from './agent.form';

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
    expect(new AgentForm( fb )).toBeTruthy();
  });
});
