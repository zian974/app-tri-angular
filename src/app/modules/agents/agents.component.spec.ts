import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { reducers } from 'src/app/app.reducer';
import { ListMetadata } from 'src/app/shared/models/list-metadata.model';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';

import { AgentsComponent } from './agents.component';
import { AgentsService } from './agents.service';
import { AgentsFiltersComponent } from './components/agents-filters/agents-filters.component';
import { AgentsTableComponent } from './components/agents-table/agents-table.component';
import { AgentModel } from './models/agent.model';
import { Agents } from './models/agents.model';

describe('AgentsComponent', () => {
  let component: AgentsComponent;
  let fixture: ComponentFixture<AgentsComponent>;

  const AgentsServiceStub = {
    agents: {
      items: [
        new AgentModel(),
        new AgentModel(),
        new AgentModel(),
        new AgentModel(),
        new AgentModel(),
        new AgentModel(),
        new AgentModel(),
        new AgentModel({
          id: 8,
          nom: "Valjean",
          prenom: "jean",
          email: "jean.valjean@gmail.com",
          abbr: "JEAVAL"
        }),
        new AgentModel({
          id: 9,
          nom: "Dupont",
          prenom: "jean-Yves",
          email: "jean-yves.dupont@gmail.com",
          abbr: "JEADUP"
        }),
        new AgentModel(),
      ],
      metadata: new ListMetadata({totalItems:6})
    },
    index: function (): Observable<Agents> {
      // component.data.agents = this.agents;
      return of(this.agents);
    },
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsComponent, AgentsTableComponent, AgentsFiltersComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        SpinnerModule,
      ],
      providers: [
        // FormBuilder,
        {provide: AgentsService, useValue: AgentsServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Sanity Check', () => {
  //   expect(true).toBe(true);
  // });


  describe( "index() test", () => {

    it('Sanity Check', () => {
      expect(true).toBe(true);
    });

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


    it('should get agents', fakeAsync(() => {
      component.index();
      flush();
      fixture.detectChanges();

      let rows: any[] = fixture.nativeElement.querySelectorAll('agents-table .agents-table tbody tr');

      expect(rows.length === 10).toBeTrue();

      let row = rows[7];
      expect(row.querySelector('.nom').innerText).toBe('Valjean jean');
      expect(row.querySelector('.email').innerText).toBe('jean.valjean@gmail.com');
      expect(row.querySelector('.abbr').innerText).toBe('JEAVAL');

    }));
  });
});
