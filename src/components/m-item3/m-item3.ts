import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the MItem3Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'm-item3',
  templateUrl: 'm-item3.html'
})
export class MItem3Component {

  @Input('data') data;
  bbcolor: any;

  constructor(private cdr: ChangeDetectorRef) {
    console.log('Hello MItem3Component Component');
  }

  ngAfterViewInit() {
    if(this.data.status == 'En proceso') this.bbcolor = '#ffa904'
    else if(this.data.status == 'Recibido') this.bbcolor = '#cdd421'
    else if(this.data.status == 'Enviado') this.bbcolor = '#0ce9f4'
    else if(this.data.status == 'Cancelado') this.bbcolor = '#ff0000'
    this.cdr.detectChanges(); 
  }

}
