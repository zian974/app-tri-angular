import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserForm } from './user.form';

describe('UsersFilters', () => {
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
    expect(new UserForm( fb )).toBeTruthy();
  });
});
