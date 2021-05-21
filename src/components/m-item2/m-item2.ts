import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the MItem2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'm-item2',
  templateUrl: 'm-item2.html'
})
export class MItem2Component {

  // product_root = "hhttp://127.0.0.1:8000/products/"
  product_root = "http://sistemasamedida.eawebagency.com/app/NewServer/public/products/"
  count: number = 0;

  @Input('data') data;
  @Output() itemBtnClick: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    console.log('Hello MItem2Component Component');
  }

  plus() {
    this.count++;
  }

  minus() {
    if(this.count > 0) this.count--;
  }

  itemBtnClicked() {
    let data = {
      id: this.data.id,
      name: this.data.name,
      category_name: this.data.category,
      count: this.count
    }
    this.itemBtnClick.emit(data);
  }
}
