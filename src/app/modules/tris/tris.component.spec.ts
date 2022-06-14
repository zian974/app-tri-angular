import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.reducer';
import { TriModel } from './models/tri.model';
import { Tris, TrisModelMetadata } from './models/tris.model';
import { TrisModule } from './tris.module';
import { TrisService } from './services/tris.service';

import { TrisComponent } from './tris.component';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';
import { TrisTableComponent } from './components/tris-table/tris-table.component';
import { TrisFiltersComponent } from './components/tris-filters/tris-filters.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

describe('TrisComponent', () => {

  let component: TrisComponent;
  let fixture: ComponentFixture<TrisComponent>;

  const trisServiceStub = {
    // The default contact object
    tris: {
      items: [
        new TriModel(),
        new TriModel(),
        new TriModel(),
        new TriModel(),
        new TriModel(),
        new TriModel({
          id: 1,
          nom_botanique: "Sideroxylon majus",
          tri_date : new Date('2022-09-01'),
          graines_pds : 5.3215,
          graines_nb : 7,
        }),
      ],
      metadata: new TrisModelMetadata
    },
    index: function (): Observable<Tris> {
      component.data.tris = this.tris;
      return of(this.tris);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrisComponent, TrisTableComponent, TrisFiltersComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, SpinnerModule,
        StoreModule.forRoot(reducers)],
      providers: [FormBuilder, {provide: TrisService, useValue: trisServiceStub}]
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

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe( "index() test", () => {

    it ( 'Should have Spinner', () => {
      let spinner: HTMLElement = fixture.nativeElement.querySelector('app-spinner');
      expect(spinner).toBeTruthy();
    });


    it ( 'Should display and hide spinner', () => {
      let spinner: HTMLElement = fixture.nativeElement.querySelector('app-spinner')

      expect(spinner.classList.contains('d-none')).toBeTrue();

      component.spinner.show();
      expect(spinner.classList.contains('d-none')).toBeFalse();

      component.spinner.hide();
      expect(spinner.classList.contains('d-none')).toBeTrue();
    });


    it('should get tris', fakeAsync(() => {
      component.index();
      flush();
      fixture.detectChanges();

      let rows: any[] = fixture.nativeElement.querySelectorAll('tris-table .tris-table tbody tr');

      expect(rows.length === 6).toBeTrue();

      let row = rows[5];
      expect(row.querySelector('.nom_botanique').innerText).toBe('Sideroxylon majus');
      expect(row.querySelector('.tri_date').innerText).toBe('01/09/2022');
      expect(row.querySelector('.graines_pds').innerText).toBe('5.3215');
      expect(row.querySelector('.graines_nb').innerText).toBe('7');

    }));
  });

});
