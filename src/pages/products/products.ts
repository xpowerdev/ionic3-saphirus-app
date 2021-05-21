import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  main_menu: any;
  categories: any;
  // category_root: any = "http://127.0.0.1:8000/categories/";
  category_root: any = "http://sistemasamedida.eawebagency.com/app/NewServer/public/categories/";
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: WebApiProvider, public loadingCtrl: LoadingController, public events: Events) {
    console.log('test point', localStorage.token);    
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    if(localStorage.token) {
      this.main_menu = {
        menu: true,
        cart: true
      }
    } else {
      this.main_menu = {
        menu: false,
        cart: false
      }
    }
    this.api.productCategory().then(res => {
      this.loading.dismiss();
      this.categories = res['data'];
    }, err=> {
      this.loading.dismiss();
      console.log('Get product category error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.events.publish('setActivedMenuId', 1);
  }

  back() {
    this.navCtrl.pop();
  }

  toBuy(category_id) {
    console.log('Called toBuy');
    if(localStorage.token) this.navCtrl.push('BuyPage', {
      id: category_id
    });
  }
}
