import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';

import { TrisComponent } from './tris.component';

describe('TrisComponent', () => {

  let component: TrisComponent;
  let fixture: ComponentFixture<TrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
        StoreModule.forRoot(reducers)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Sanity Check', () => {
    expect(true).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
