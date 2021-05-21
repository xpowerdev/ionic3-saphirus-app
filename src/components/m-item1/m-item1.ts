import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the MItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'm-item1',
  templateUrl: 'm-item1.html'
})
export class MItem1Component {

  @Input('data') data;
  @Output() itemBtnClick: EventEmitter<any> = new EventEmitter();

  rate: any = 0;

  constructor(private cdr: ChangeDetectorRef) {
    console.log('Hello MItemComponent Component');
  }

  ngAfterViewInit() {
    this.rate = this.data.rating / 2; 
    this.cdr.detectChanges(); 
    console.log('item data : ', this.data);
  }

  btnClick(key: any) {    
    console.log('Clicked button key is ', key);
    this.itemBtnClick.emit(key);  
  }

}
