import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, Events } from 'ionic-angular';

import { App } from 'ionic-angular/components/app/app';
import { WebApiProvider } from './../../providers/web-api/web-api';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  main_menu: any = {
    menu: true,
    cart: localStorage.dist != '0'? true : false,
  };
  lists: any;
  distId: any;
  result: boolean = false;
  noResult: boolean = false;

  loading: any;

  location: any;
  watchPos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public modalCtrl: ModalController, public api: WebApiProvider, public platform: Platform, public geolocation: Geolocation, public events: Events) {
    this.platform.ready().then(
      res => {        
        this.initList();
			},
			err => {
				console.log('Error platform not ready');
			}
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage', this.main_menu);
    this.watchPos = this.geolocation.watchPosition({ maximumAge: 20, timeout: 20000, enableHighAccuracy: false }).subscribe(
      res=> {
        console.log('Update geolocation');
        if(res.coords) {
          localStorage.setItem('lat', '' + res.coords.latitude);
          localStorage.setItem('lng', '' + res.coords.longitude);
          
          // localStorage.setItem('lat', '-34.443956');
          // localStorage.setItem('lng', '-58.823721');
        }
      }
    )
  }

  initList() {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present(); 
    if(!localStorage.lat || !localStorage.lng)  {
      console.log("App didn't get geolocation in list");
      let position = this.geolocation.watchPosition({ maximumAge: 20, timeout: 20000, enableHighAccuracy: false }).subscribe(
        res=> {
          if(res.coords) {
            localStorage.setItem('lat', '' + res.coords.latitude);
            localStorage.setItem('lng', '' + res.coords.longitude);            
            this.engine('all');
            position.unsubscribe();
            console.log('init watch stopped in list');
          } else {
            this.loading.dismiss();
            position.unsubscribe();
            console.log('init watch stopped in list');
          }
        }
      )
    } else {
      console.log("App got geolocation in list");
      this.engine('all');
    }    
  }

  startSearch(event) {
    if(event) {
      this.loading = this.api.makeLoading('Cargando');
      this.loading.present();
      this.engine(event);
    }    
  }

  engine(event) {
    console.log('Search key is ', event);
    this.api.getDistributors(event, localStorage.lat, localStorage.lng).then((res) => {
      this.loading.dismiss();
      if(res['message'] == 'Invalid token') {
        localStorage.setItem('token', '');
        this.app.getRootNav().setRoot('LoginPage');
      }
      else {
        if(event == 'all' || event == 'near' || event == 'ranking') this.result = false;
        else this.result = true;
        console.log('Distributors : ', res);
        this.lists = res['data']['lists'];
        this.distId = res['data']['distributor_id'];
        if(this.lists.length > 0) this.noResult = false;
        else this.noResult = true;
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }

  listClick(event, list) {
    console.log('itemBtnClicked', list['id']);
    if(event == 'page') {
      console.log('applist ; ', this.app.getRootNav());
      clearInterval(this.location);
      this.app.getRootNav().setRoot('DetailPage', {
        id: list['id']
      });
    } else if(event == 'modal') {
      this.presentModal(list);
    }
  }
  
  presentModal(data) {
    console.log('dist Id : ', this.distId);
    if(this.distId) {
      let alert = this.modalCtrl.create('AlertModalPage', {
        title: 'Atención',
        message: 'Ya estás asociado a un Distribuidor. Desasociate para poder asociarte nuevamente.',
        button: 'DE ACUERDO'
      });
      alert.present();
    } else {
      let modalConfirm = this.modalCtrl.create('ConfirmModalPage', {
        title: 'ASOCIARSE',
        message: '¿Está seguro que desea asociarse a ' + data['name'] + '?',
      });
      modalConfirm.present();
      modalConfirm.onDidDismiss((res) => {
        if(res == 1) {
          let assoicate = {
            distributor_id: data['id']
          }
          this.api.contactDist(assoicate).then(res=> {
            if(res['message'] == "You associated with distributor" || res['message'] == 'Your distributor is changed') {            
              let modalAlert = this.modalCtrl.create('AlertModalPage', {
                title: '¡TE HAS ASOCIADO!',
                message: 'Te asociaste a '+ data['name'] +'. El distribuidor recibirá tu solicitud y se comunicará a la brevedad, mientras tanto podés ir armando tu pedido.',
                button: 'HACE TU PEDIDO'
              });
              localStorage.setItem('dist', data['id']);
              this.events.publish('setDistId', data['id']);
              modalAlert.present();
              modalAlert.onDidDismiss(() => {
                this.app.getRootNav().setRoot('ProductsPage');
              })            
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
          })
        }
      });
    }
  }

  ionViewDidLeave() {
    this.watchPos.unsubscribe();
  }

}
