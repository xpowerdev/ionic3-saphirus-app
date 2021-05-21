import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';
import { Events } from 'ionic-angular';

/**
 * Generated class for the MainHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-header',
  templateUrl: 'main-header.html'
})
export class MainHeaderComponent {

  order: any = 0;
  @Input('data') data = {
    menu: true,
    cart: true
  };
  @Output() backClick: EventEmitter<any> = new EventEmitter();

  constructor(public app: App, public events: Events) {
    console.log('Hello MainHeaderComponent Component');
    if(localStorage.cart) {
      JSON.parse(localStorage.cart).forEach(cart => {
        this.order += cart.count;
      });
    }
    events.subscribe('addCart', (data) => {
      this.order = data;
    });
  }

  toOrder() {
    this.app.getRootNav().push('OrderPage');
  }

  backClicked() {    
    return this.backClick.emit();
  }

}
