import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrisTableComponent } from './tris-table.component';

describe('TrisTableComponent', () => {
  let component: TrisTableComponent;
  let fixture: ComponentFixture<TrisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisTableComponent ]
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
