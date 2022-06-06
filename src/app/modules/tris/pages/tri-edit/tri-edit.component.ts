import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TriForm } from '../../forms/triForm';
import { Tri, TriModel } from '../../models/tri';
import { TrisService } from '../../services/tris.service';

@Component({
  selector: 'tri-edit',
  templateUrl: './tri-edit.component.html',
  styleUrls: ['./tri-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriEditComponent implements OnInit {

  public data: { tri: TriModel } = {
    tri: new TriModel(),
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

  }


  getItem = ( id: number ): void => {
    this.triSvc.get(id).subscribe(
      ( response: Tri ) => {
        this.data.tri = new TriModel({ ...response });
        this.triForm.patchValue(response);
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
          console.log(controls[ctrl].errors)
        }

      }

console.log(this.triForm.fg.value);

      return;
    };

    this.triSvc.store( this.triForm.fg.value ).subscribe(
      (response:any) => {
        this.triForm.patchValue(response);
      }
    );
  }

}
