import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  id: any;
  header: any = {
    id: 1,
    name: "",
    logo: "",
    city: "",
    rating: "0.00",
    voters: 0
  };
  contact: any;
  reviews: any;

  infoId: any;
  dist: any;
  loading: any;
  main_menu: any = {
    menu: false,
    cart: false
  }

  // avatar_root: any = "http://127.0.0.1:8000/avatars/";
  avatar_root: any = "http://sistemasamedida.eawebagency.com/app/NewServer/public/avatars/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: WebApiProvider, public modalCtrl: ModalController, public app: App, public events: Events) {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    this.id = this.navParams.get('id');
    this.api.distributorDetail(this.id).then((res) => {
      console.log('Detail data : ', res);
      this.header = res['data']['header'];
      this.contact = res['data']['contact'];
      this.reviews = res['data']['reviews'];
      this.infoId = res['data']['header']['is_visible'];
      this.dist = res['data']['header']['is_visible'];
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.events.publish('setActivedMenuId', 3);
  }

  select(id) {
    console.log('test point', id);
    if(id == 1) {
      this.infoId = true;
    } else if(id==2) {
      this.infoId = false;
    }
  }

  toDistributor() {
    this.app.getRootNav().setRoot('DistributorPage');
  }

  contactDist(distId) {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    let data = {
      distributor_id: distId      
    };
    this.api.contactDist(data).then((res)=> {
      this.loading.dismiss();
      if(res['message'] == "You associated with distributor" || res['message'] == 'Your distributor is changed') {
        if(distId) this.navCtrl.push('ProductsPage');
        else this.navCtrl.push('DistributorPage');
        localStorage.setItem('dist', distId);
        this.events.publish('setDistId', distId);      
      } else {
        let alert = this.modalCtrl.create('AlertModalPage', {
          title: 'Atención',
          message: 'Recordá que solo podrás asociarte a 1 Distribuidor 1 vez al mes',
          button: 'DE ACUERDO'
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.app.getRootNav().setRoot('ProductsPage');
        }) 
      }
    }, (err) => {
      console.log('err : ', err);
    })
  }

}
