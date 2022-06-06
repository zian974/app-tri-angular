import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsSelectComponent } from './agents-select.component';

describe('AgentsSelectComponent', () => {
  let component: AgentsSelectComponent;
  let fixture: ComponentFixture<AgentsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
