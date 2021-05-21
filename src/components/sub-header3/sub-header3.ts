import { Component, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

/**
 * Generated class for the SubHeader3Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sub-header3',
  templateUrl: 'sub-header3.html'
})
export class SubHeader3Component {

  activeItem : any = 1;
  @Input('data') data;
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  // logo_root: any = "http://127.0.0.1:8000/logos/";
  logo_root: any = "http://sistemasamedida.eawebagency.com/app/NewServer/public/logos/";

  constructor(private cdr: ChangeDetectorRef) {
    console.log('Hello SubHeader3Component Component');
  }

  ngAfterViewInit() { 
    console.log('Input data', this.data);
    this.cdr.detectChanges(); 
  }

  btnClicked(id) {
    console.log('test component', id);
    this.activeItem = id;
    this.btnClick.emit(id);
  }

}
