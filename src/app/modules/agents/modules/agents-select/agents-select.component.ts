import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, ViewChild, OnDestroy, Renderer2, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { AgentModel } from '../../models/agent.model';
import { Agents } from '../../models/agents.model';
import { AgentsSelectService } from './agents-select.service';

@Component({
  selector: 'agents-select',
  templateUrl: './agents-select.component.html',
  styles: [
    ':host { display:block; }',
    ':host > form { position: relative; z-index: 1}',
    '.agentsFilterContainer {position: absolute; inset: 0px 0 auto 0; transform: translate(0px, 42px);} ',
    '.spinner { display: none }',
    '.spinner.show { display: block }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formInput!: FormControl;

  @Input() multiple!: Boolean;

  @Input() set selectedAgents( agents: AgentModel[] ) {
    this.data.selectedAgents = [...agents];
    this.cdRef.markForCheck();
  }

  @ViewChild('agentsForm') ngForm!: NgForm;


  public data = {
    agents: [] as AgentModel[],
    selectedAgents: [] as AgentModel[],
    states: {
      listVisible: false
    },
    filters: {
      abbr: ""
    }
  }

  public unlistenDocumentClick$!: Function;

  public formChangesSubscription$!: Observable<any>;

  private onComponentDestroy$ = new Subject();

  constructor(
    private agentsSvc : AgentsSelectService,
    private _elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private element: ElementRef,
    private renderer: Renderer2,) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.formChangesSubscription$ = this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this.onComponentDestroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter( (filters: any ) => {
          return filters.abbr && filters.abbr.length >= 3;
        }),
        switchMap( filters => {
          this._elementRef.nativeElement.querySelector('.spinner')?.classList.add('show');
          return this.agentsSvc.index( filters ).pipe(
            finalize( () => this._elementRef.nativeElement.querySelector('.spinner')?.classList.remove('show'))
          );
        }),
      )

    this.formChangesSubscription$.subscribe( (response: Agents) => {
      if ( response.items && response.items.length > 0 ) {
        this.data.agents = [...response.items ];
        this.data.states.listVisible = true;
      }
      this.cdRef.markForCheck();
    });

    this.unlistenDocumentClick$ = this.renderer.listen(document, 'click', (e: MouseEvent) => {
      this.onClickOutside(e)
    });
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }


  trackBy = ( index: number, agent: AgentModel ): number => {
    return agent.id as number;
  }


  onClick = ( agent: AgentModel ) => {
    if ( !(this.formInput.value as number[]).includes(agent.id as number) ) {
      this.formInput.value.push( agent.id );
      this.data.selectedAgents.push(agent);
      this.formInput.updateValueAndValidity();
    }

    this.data.filters.abbr = "";
    this.toggleList();
  }


  onRemove = ( index: number ) => {
    let agentId: number = this.data.selectedAgents[index].id as number;

    let value: number[] = this.formInput.value;
    value = value.filter( el => el !== agentId );
    this.formInput.setValue(value);
    this.data.selectedAgents.splice(index, 1);
    this.formInput.markAsDirty();
  }


  onClickOutside(event: MouseEvent): void {
    let filterContainer = this.element.nativeElement.querySelector('.agentsFilterContainer');
    if (filterContainer && !this.element.nativeElement.querySelector('.agentsFilterContainer').contains(event.target)) {
      this.toggleList( event );
    }
  }

  toggleList( event: MouseEvent|null = null): void {
    this.data.states.listVisible = !this.data.states.listVisible;
    this.cdRef.markForCheck();
    event?.stopPropagation();
  }
}
