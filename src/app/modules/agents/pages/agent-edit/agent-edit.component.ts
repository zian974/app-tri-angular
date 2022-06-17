import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Taxon } from 'src/app/modules/flores/modules/taxref/taxref.model';
import { SpinnerComponent } from 'src/app/shared/modules/spinner/spinner.component';
import { AgentsService } from '../../agents.service';
import { AgentForm } from '../../forms/agent.form';
import { AgentModel } from '../../models/agent.model';

@Component({
  selector: 'agent-edit',
  templateUrl: './agent-edit.component.html',
  styles: [
    `:host { display: block; position: relative; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentEditComponent implements OnInit, OnDestroy {

  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent

  private onComponentDestroy$ = new Subject();

  public data: { agent: AgentModel, selectedTaxon: Taxon } = {
    agent: new AgentModel(),
    selectedTaxon: new Taxon(),
  }

  public agentForm = new AgentForm( this.fb );
  public fg = this.agentForm.fg;


  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private agentSvc : AgentsService,) { }


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
    this.agentSvc.get(id).subscribe(
      ( response: AgentModel ) => {
        this.data.agent = new AgentModel({ ...response });
        this.agentForm.patchValue(response);
        this.cdRef.markForCheck();
      }
    )
  }


  deleteItem() {

  }


  submitItem() {
    if ( this.agentForm.fg.status !== 'VALID' ) {
      let controls: { [key: string]: AbstractControl; } = this.agentForm.fg.controls;
      for ( let ctrl in controls ) {
        controls[ctrl].markAsDirty();
        if ( controls[ctrl].status !== 'VALID' ) {
          console.log(ctrl, controls[ctrl].errors)
        }

      }
      return;
    };

    this.spinner.show();
    this.agentSvc.store( this.agentForm.fg.value )
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (response:any) => {
          this.agentForm.patchValue(response);
        }
      );
  }
}
