import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';

import { AgentsFiltersComponent } from './agents-filters.component';

describe('AgentsFiltersComponent', () => {
  let component: AgentsFiltersComponent;
  let fixture: ComponentFixture<AgentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsFiltersComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
