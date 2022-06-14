import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';
import { TrisFiltersComponent } from '../tris-filters/tris-filters.component';

import { TrisTableComponent } from './tris-table.component';

describe('TrisTableComponent', () => {
  let component: TrisTableComponent;
  let fixture: ComponentFixture<TrisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisTableComponent, TrisFiltersComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
