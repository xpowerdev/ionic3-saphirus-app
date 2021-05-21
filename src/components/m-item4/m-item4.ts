import { Component, Input } from '@angular/core';

/**
 * Generated class for the MItem4Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'm-item4',
  templateUrl: 'm-item4.html'
})
export class MItem4Component {

  @Input('message') message: any;

  constructor() {
    console.log('Hello MItem4Component Component');
  }

  changeTimezone(time, timezone, timezone_type) {
    let displaytime = time.substring(0, 16);
    let type = timezone_type > 0? '+' + timezone_type : timezone_type;
    let date = new Date(displaytime + ' '+ timezone + type);
    return date.toLocaleString();
  }

}
