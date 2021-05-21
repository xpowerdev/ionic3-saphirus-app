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
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  noOrder: any = true;
  newOrderNo: any;
  orders: any = [];
  hasOrder: boolean;
  total: any = 0;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public app: App, public api: WebApiProvider, public events: Events) {    
    this.loading = api.makeLoading('Cargando');
    this.loading.present();    
    this.api.getOrderNo().then(res => {
      if(localStorage.cart) {
        this.orders = JSON.parse(localStorage.cart);
        if(this.orders.length != 0) this.hasOrder = true;
        else this.hasOrder = false;
        console.log(this.orders);
        this.orders.forEach(order => {
          this.total += order.count;
        });
      }
      else this.hasOrder = false;
      this.newOrderNo = res['data'];
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log('Get order no error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.events.subscribe('hasOrder', data => {
      if(data != 0) {
        this.hasOrder = true;
      } else {
        this.hasOrder = false;
      }
    })
  }

  changeNumber(data, direction) {
    let id = this.orders.findIndex(order => order.name == data.name);

    if(direction == 'plus') {
      data.count++;
      this.orders[id]['count'] = data.count;
    } else {   
      data.count--;   
      if(data.count < 1) {
        let dataArr = this.orders.splice(id, 1);
        console.log('zero', dataArr);
      }
    }    
    let sum = 0;
    this.orders.forEach(order => {
      sum += order.count;
    });
    this.total = sum;
    this.events.publish('addCart', this.total);
    this.events.publish('hasOrder', this.total);
    localStorage.setItem('cart', JSON.stringify(this.orders));
  }

  confirm() {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    let current = new Date();
    let month = this.addZero(current.getMonth() + 1);
    let date = this.addZero(current.getDate());
    let hours = this.addZero(current.getHours());
    let mins = this.addZero(current.getMinutes());
    let seconds = this.addZero(current.getSeconds());
    let data = {
      distributor_id: localStorage.dist,
      date: current.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + mins + ':' + seconds,
      data: localStorage.cart
    }
    console.log('order data : ', data);
    this.api.toOrder(data).then(res => {
      this.loading.dismiss();
      localStorage.cart = '';
      let modal = this.modalCtrl.create('AlertModalPage', {
        title: '¡PEDIDO REALIZADO!',
        message: 'Hemos enviado el pedido a tu distribuidor, te avisaremos cuando este en camino. Mientras tanto puedes ver su estado en tu historial.',
        button: 'HISTORIAL DE PEDIDOS'
      });
      modal.present();
      modal.onDidDismiss(() => {
        this.app.getRootNav().setRoot('OrderHistoryPage');
      })
    }, err => {
      this.loading.dismiss();
      console.log('Order failed');
    })       
  }

  private addZero(data) {
    return data < 10? '0' + data : data;
  }

  toProducts() {
    this.navCtrl.push('ProductsPage');
  }
}
