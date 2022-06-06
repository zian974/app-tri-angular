import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, ViewChild, OnDestroy, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Agent, AgentModel } from 'src/app/modules/models/agent';
import { Agents } from 'src/app/modules/models/agents';
import { AgentsSelectService } from './agents-select.service';

@Component({
  selector: 'agents-select',
  templateUrl: './agents-select.component.html',
  styleUrls: ['./agents-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formInput!: FormControl;

  @Input() multiple!: Boolean;

  @Input() set selectedAgents( agents: Agent[] ) {
    this.data.selectedAgents = [...agents];
    this.cdRef.markForCheck();
  }

  @ViewChild('agentsForm') ngForm!: NgForm;


  public data = {
    agents: [] as Agent[],
    selectedAgents: [] as Agent[],
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
          return this.agentsSvc.index( filters );
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


  trackBy = ( index: number, agent: Agent ): number => {
    return agent.id as number;
  }


  onClick = ( agent: Agent ) => {
    if ( !(this.formInput.value as number[]).includes(agent.id as number) ) {
      this.formInput.value.push( agent.id );
      this.data.selectedAgents.push(agent);
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
