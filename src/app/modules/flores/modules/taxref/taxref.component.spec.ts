import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxrefComponent } from './taxref.component';

describe('TaxrefComponent', () => {
  let component: TaxrefComponent;
  let fixture: ComponentFixture<TaxrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxrefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
