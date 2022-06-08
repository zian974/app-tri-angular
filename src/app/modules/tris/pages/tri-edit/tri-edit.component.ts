import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Taxon } from 'src/app/modules/flores/modules/taxref/taxref.model';
import { TriForm } from '../../forms/triForm';
import { Tri, TriModel } from '../../models/tri';
import { TrisService } from '../../services/tris.service';

@Component({
  selector: 'tri-edit',
  templateUrl: './tri-edit.component.html',
  styleUrls: ['./tri-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriEditComponent implements OnInit, OnDestroy {

  private onComponentDestroy$ = new Subject();

  public data: { tri: TriModel, selectedTaxon: Taxon } = {
    tri: new TriModel(),
    selectedTaxon: new Taxon()
  }

  public triForm = new TriForm( this.fb );


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

    this.triSvc.store( this.triForm.fg.value ).subscribe(
      (response:any) => {
        this.triForm.patchValue(response);
      }
    );
  }

  onTaxonSelect( taxon: Taxon ) {
    this.triForm.nom_botanique.setValue(taxon.scientificName);
    this.triForm.cd_ref.setValue(taxon.referenceId);
  }

}
