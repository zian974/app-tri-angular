import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';

import { TrisFiltersComponent } from './tris-filters.component';

describe('TrisFiltersComponent', () => {

  let component: TrisFiltersComponent;
  let fixture: ComponentFixture<TrisFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisFiltersComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrisFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
