import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Taxon } from 'src/app/modules/flores/modules/taxref/taxref.model';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { TriForm } from '../../forms/triForm';
import { Tri, TriModel } from '../../models/tri';
import { TrisService } from '../../services/tris.service';

@Component({
  selector: 'tri-edit',
  templateUrl: './tri-edit.component.html',
  styles: [
    `:host { display: block; position: relative; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriEditComponent implements OnInit, OnDestroy {

  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent

  private onComponentDestroy$ = new Subject();

  public data: { tri: TriModel, selectedTaxon: Taxon } = {
    tri: new TriModel(),
    selectedTaxon: new Taxon(),

  }

  public triForm = new TriForm( this.fb );
  public fg = this.triForm.fg;


  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private triSvc : TrisService,) { }


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    if ( id ) {
      this.getItem(id);
    } else {

    }

    this.triForm.tri_origin.valueChanges.pipe(
      tap( (event: string) => {
        if (event === 'other') {
          this.triForm.tri_origin_other.setValidators(Validators.required);
        } else {
          this.triForm.tri_origin_other.clearValidators();
          this.triForm.tri_origin_other.reset();
        }
        this.triForm.tri_origin_other.updateValueAndValidity();
      } )
    ).subscribe(
    )
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }


  getItem = ( id: number ): void => {
    this.triSvc.get(id).subscribe(
      ( response: Tri ) => {
        this.data.tri = new TriModel({ ...response });
        this.triForm.patchValue(response);
        this.data.selectedTaxon = new Taxon({
          referenceId: this.data.tri.cd_ref,
          scientificName: this.data.tri.nom_botanique,
        });
        this.cdRef.markForCheck();
      }
    )
  }


  deleteItem() {

  }


  submitItem() {
    if ( this.triForm.fg.status !== 'VALID' ) {
      let controls: { [key: string]: AbstractControl; } = this.triForm.fg.controls;
      for ( let ctrl in controls ) {
        controls[ctrl].markAsDirty();

        if ( controls[ctrl].status !== 'VALID' ) {
          console.log(ctrl, controls[ctrl].errors)
        }

      }
      return;
    };

    this.spinner.show();
    this.triSvc.store( this.triForm.fg.value )
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (response:any) => {
          this.triForm.patchValue(response);
        }
      );
  }


  onTaxonSelect( taxon: any ) {
    this.triForm.nom_botanique.setValue(taxon.scientificName);
    this.triForm.cd_ref.setValue(taxon.referenceId);
  }


  onFruitsEtatChange(event: any) {
    if (event.target.checked) {
      this.triForm.fruits_etat.push(new FormControl(event.target.value))
    } else {
      const index = this.triForm.fruits_etat.controls.findIndex( el => el.value === event.target.value );
      if ( index !== -1 ) {
        this.triForm.fruits_etat.removeAt(index);
      }
    }
  }


  onGrainesEtatChange(event: any) {
    this.triForm.graines_etat.controls.splice(0,1);
    this.triForm.graines_etat.push(new FormControl(event.target.value))
  }

}
