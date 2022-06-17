import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { reducers } from 'src/app/app.reducer';
import { ListMetadata } from 'src/app/shared/models/list-metadata.model';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UsersFiltersComponent } from './components/users-filters/users-filters.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserModel } from './models/user.model';
import { Users } from './models/users.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const UsersServiceStub = {
    users: {
      items: [
        new UserModel(),
        new UserModel(),
        new UserModel(),
        new UserModel(),
        new UserModel(),
        new UserModel(),
        new UserModel(),
        new UserModel({
          id: 8,
          nom: "Valjean",
          prenom: "jean",
          email: "jean.valjean@gmail.com",
          abbr: "JEAVAL"
        }),
        new UserModel({
          id: 9,
          nom: "Dupont",
          prenom: "jean-Yves",
          email: "jean-yves.dupont@gmail.com",
          abbr: "JEADUP"
        }),
        new UserModel(),
      ],
      metadata: new ListMetadata({totalItems:6})
    },
    index: function (): Observable<Users> {
      component.data.users = this.users;
      return of(this.users);
    },
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent, UsersTableComponent, UsersFiltersComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        SpinnerModule,
      ],
      providers: [
        // FormBuilder,
        {provide: UsersService, useValue: UsersServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sanity Check', () => {
    expect(true).toBe(true);
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


    it('should get users', fakeAsync(() => {
      component.index();
      flush();
      fixture.detectChanges();

      let rows: any[] = fixture.nativeElement.querySelectorAll('users-table .users-table tbody tr');
      expect(rows.length === 10).toBeTrue();
      console.log('Users rows.length', rows.length);

      let row = rows[7];
      expect(row.querySelector('.nom').innerText).toBe('Valjean jean');
      expect(row.querySelector('.email').innerText).toBe('jean.valjean@gmail.com');
      expect(row.querySelector('.abbr').innerText).toBe('JEAVAL');

    }));
  });
});
