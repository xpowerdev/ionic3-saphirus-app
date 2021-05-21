import { Component, EventEmitter, Output, Input } from '@angular/core';

/**
 * Generated class for the SubHeader2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sub-header2',
  templateUrl: 'sub-header2.html'
})
export class SubHeader2Component {

  flag: any;
  @Input('category') category; 
  @Output() categoryClick: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello SubHeader2Component Component');
    this.flag = 'a';
  }

  btnClick(key) {
    console.log('Selected category is ', key);
    this.flag = key;
    return this.categoryClick.emit(key);
  }

}
