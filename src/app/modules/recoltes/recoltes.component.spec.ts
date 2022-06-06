import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoltesComponent } from './recoltes.component';

describe('RecoltesComponent', () => {
  let component: RecoltesComponent;
  let fixture: ComponentFixture<RecoltesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoltesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
