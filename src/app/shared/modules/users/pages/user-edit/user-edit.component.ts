import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Taxon } from 'src/app/modules/flores/modules/taxref/taxref.model';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { UsersService } from '../../users.service';
import { UserForm } from '../../forms/user.form';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
    `:host { display: block; position: relative; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {

  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent

  private onComponentDestroy$ = new Subject();

  public data: { user: UserModel, selectedTaxon: Taxon } = {
    user: new UserModel(),
    selectedTaxon: new Taxon(),
  }

  public userForm = new UserForm( this.fb );
  public fg = this.userForm.fg;


  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userSvc : UsersService,) { }


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if ( id ) {
      this.getItem(id);
    } else {
    }
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }


  getItem = ( id: number ): void => {
    this.userSvc.get(id).subscribe(
      ( response: UserModel ) => {
        this.data.user = new UserModel({ ...response });
        this.userForm.patchValue(response);
        this.cdRef.markForCheck();
      }
    )
  }


  deleteItem() {

  }


  submitItem() {
    if ( this.userForm.fg.status !== 'VALID' ) {
      let controls: { [key: string]: AbstractControl; } = this.userForm.fg.controls;
      for ( let ctrl in controls ) {
        controls[ctrl].markAsDirty();
        if ( controls[ctrl].status !== 'VALID' ) {
          console.log(ctrl, controls[ctrl].errors)
        }

      }
      return;
    };

    this.spinner.show();
    this.userSvc.store( this.userForm.fg.value )
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (response:any) => {
          this.userForm.patchValue(response);
        }
      );
  }
}
