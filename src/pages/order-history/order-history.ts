import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  category: any = {
    a: 'TODOS',
    b: 'EN PROCESO',
    c: 'ENVIADOS'
  };
  histories: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public app: App, public events: Events, public api:WebApiProvider) {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    this.api.getOrderHistory('all').then(res => {
      this.histories = res['data'];
      this.loading.dismiss();
      if(res['data'].length != 0) this.review(localStorage.dist);
    }, err => {
      this.loading.dismiss();
      console.log('Get order history error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
    this.events.publish('setActivedMenuId', 2);
  }

  filter(event) {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    let data = event != 'a'? this.category[event] : 'all';
    this.api.getOrderHistory(data).then(res => {
      this.histories = res['data'];
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log('Get order history filter error : ', err);
    })
  }

  review(id) {
    let reviewModal = this.modalCtrl.create('ReviewModalPage');
    reviewModal.present();
    reviewModal.onDidDismiss((data) => {
      if(data == 1) {
        this.app.getRootNav().setRoot('ReviewPage', {
          distributor_id: id
        });
      }
    })
  }

}
