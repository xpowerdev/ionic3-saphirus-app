import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  // message: any = {
  //   from : 'Conforam',
  //   time : '18/05/2018 1:45 am',
  //   status : 'Envío entregado',
  //   message : 'This is test message'
  // }

  messages: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public api: WebApiProvider) {
    this.loading = api.makeLoading('Cargando');
    this.loading.present();
    api.getAllMessage().then(res => {
      this.messages = res['data'];
      this.events.publish('count_message', 0);
      this.loading.dismiss();
      console.log('messages : ', this.messages);
    }, err => {
      this.loading.dismiss();
      console.log('Get message error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.events.publish('setActivedMenuId', 5);
  }

}
