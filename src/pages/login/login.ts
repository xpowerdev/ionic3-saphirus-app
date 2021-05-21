import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

import { WebApiProvider } from './../../providers/web-api/web-api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: any;
  password: any;

  // email: any = "admin@admin.com";
  // password: any = "password";

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: WebApiProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public events: Events, private firebase: Firebase) {
    if(!localStorage.firebase_token) {
      this.firebase.getToken().then(token => localStorage.setItem('firebase_token', token))
      .catch(error => console.error('Error getting token', error));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.events.publish('setActivedMenuId', 7);
  }

  login() {
    console.log('Called login');
    if(this.email && this.password) {
      if(this.validater()) {
        this.loading = this.api.makeLoading('Por favor espera');
        this.loading.present();
        let data = {
          email: this.email,
          password: this.password,
          firebase_token: localStorage.firebase_token
        };
        this.api.login(data).then((res) => {
          console.log(res);
          if(res['message'] == "success") {
            this.setMenuProfile(res['data']['user_info']);
            localStorage.setItem('token', res['data']['remember_token']);
            if(res['data']['distributor']) {
              localStorage.setItem('dist', res['data']['distributor']['distributor_id']);
              this.events.publish('setDistId', res['data']['distributor']['distributor_id']);
            }
            this.events.publish('count_message', res['data']['messages']);
            if(localStorage.dist) this.toPage('ProductsPage');
            else this.toPage('DistributorPage');
          } else {
            this.presentModal('Email o Clave son incorrectos por favor verificar los datos ingresados');
          }
          this.loading.dismiss();
        }, (err) => {
          console.log('Login error : ', err);
          this.loading.dismiss();
        });  
      } else {
        this.presentModal('El formato de correo electrónico no es correcto');
      }      
    } else {
      console.log('Email or password is required');
      this.presentModal('Los campos Email y Clave no puede estar vacíos, completar con los datos correspondientes');
    }
  }

  validater() {
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(this.email);
  }

  presentModal(message) {
    let modal = this.modalCtrl.create('AlertModalPage', {
      title: 'Atención',
      message: message,
      button: 'DE ACUERDO'
    });
    modal.present();
  }

  toPage(pagename) {
    console.log('Go to ', pagename);
    this.navCtrl.push(pagename);
  }

  setMenuProfile(data) {
    console.log('Login event publish');
    this.events.publish('setMenu', data);
  }

}
