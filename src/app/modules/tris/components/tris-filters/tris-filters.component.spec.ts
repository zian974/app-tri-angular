import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrisFiltersComponent } from './tris-filters.component';

describe('TrisFiltersComponent', () => {
  let component: TrisFiltersComponent;
  let fixture: ComponentFixture<TrisFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisFiltersComponent ]
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
