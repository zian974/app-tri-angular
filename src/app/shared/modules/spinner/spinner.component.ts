import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="modal-backdrop fader" (click)="onClickBackDrop()">
    </div>
    <div class="spinner-border fader text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow fader text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  styles: [
    `:host { display: block; position: relative; top:0; bottom:0; left:0; right:0; }`,
    `.spinner-border { opacity: 0; position:fixed; top: 50%; left: 50%; width: 3rem; height: 3rem; /*border-width: 0.5rem*/}`,
    `.spinner-grow { background-color: white; opacity: 0; position:fixed; top: calc(50% + 0.5rem); left: calc(50% + 0.5rem); width: 2rem; height: 2rem; /*border-width: 0.5rem*/}`,
    `
    .fader {
      transition: opacity 0.3s linear;
    }
    .backgrounder {
      transition: background-color 0.3s linear;
    }
    .modal-backdrop {
      --bs-backdrop-zindex: 1050;
      --bs-backdrop-bg: #000;
      --bs-backdrop-opacity: 0.5;
      position: fixed;
      top: 0;
      left: 0;
      z-index: var(--bs-backdrop-zindex);
      width: 100vw;
      height: 100vh;
      background-color: #000;
      opacity: 0;
    }

    :host.show .modal-backdrop {
      opacity: var(--bs-backdrop-opacity);
    }

    :host.show .spinner-border, :host.show .spinner-grow {
      opacity: 1;
    }
    :host.show .spinner-grow {
      background-color: currentColor
    }
  `
  ],
  host: {
    class: 'd-none'
  }
})
export class SpinnerComponent implements OnInit {

  constructor(
    private _elementRef: ElementRef<HTMLElement>,) {
  }

  ngOnInit(): void {
    // const element = this._elementRef.nativeElement;
    // this._elementRef.nativeElement/*.querySelector('.modal-backdrop')?*/.classList.add('show');
  }


  onClickBackDrop() {
  //   this._elementRef.nativeElement./*querySelector('.modal-backdrop')?.*/classList.remove('show')
  //   setTimeout( () => {
  //     this._elementRef.nativeElement.classList.add('d-none');
  //   }, 500);
  }


  show() {
    this._elementRef.nativeElement.classList.remove('d-none');
    this._elementRef.nativeElement.classList.add('show');
  }


  hide() {
    this._elementRef.nativeElement.classList.remove('show');
  }

}
