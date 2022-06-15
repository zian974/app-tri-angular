import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';
import { AgentsFiltersComponent } from '../agents-filters/agents-filters.component';

import { AgentsTableComponent } from './agents-table.component';

describe('AgentsTableComponent', () => {
  let component: AgentsTableComponent;
  let fixture: ComponentFixture<AgentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsTableComponent, AgentsFiltersComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
