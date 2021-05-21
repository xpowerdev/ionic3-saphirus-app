import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  main_header: any = {
    menu: false,
    cart: true
  };

  category_name: any;
  products: any;
  loading: any;

  cart: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public api: WebApiProvider) {
    if(localStorage.cart) this.cart = JSON.parse(localStorage.cart);
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    let category_id = this. navParams.get('id');
    this.api.productsWithCat(category_id).then(res => {
      console.log('Buy list : ', res);
      this.category_name = res['data']['name'];
      this.products = res['data']['products'];
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log('Buy list get error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
    this.events.publish('setActivedMenuId', 1);
  }

  addToCart(data) {
    let index = this.cart.findIndex(order => order.id == data.id);
    if(index != -1) {
      this.cart[index]['count'] += data.count;
    } else {
      this.cart.push(data);
    }
    let total = 0;
    this.cart.forEach(cart => {
      total += cart.count;
    });
    this.events.publish('addCart', total);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(localStorage.cart);
  }

  back() {
    this.navCtrl.pop();
  }
}
