import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SubHeader1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sub-header1',
  templateUrl: 'sub-header1.html'
})
export class SubHeader1Component {

  @Output() itemBtnClick: EventEmitter<any> = new EventEmitter();
  search: any;
  btn: any = 'all';

  constructor() {
    console.log('Hello SubHeader1Component Component');
  }

  btnClick(key: any) {    
    console.log('Clicked button key is ', key);
    if(key == 'near' || key == 'all' || key == 'ranking') {
      this.search = '';
      this.btn = key;
    } else {
      this.btn = '';
    }
    this.itemBtnClick.emit(key);  
  }

}
