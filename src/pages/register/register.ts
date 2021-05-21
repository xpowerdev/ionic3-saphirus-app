import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

import { WebApiProvider } from './../../providers/web-api/web-api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: any;
  lastname: any;
  address: any;
  tel: any;
  city: any;
  province: any;
  dni: any;
  email: any;
  password: any;
  
  // name: any = "Admin";
  // lastname: any = "Admin";
  // address: any = "Admin";
  // city: any = "Admin";
  // province: any = "Admin";
  // dni: any = 123456;
  // email: any = "admin@admin.com";
  // password: any = "password";

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: WebApiProvider, public modalCtrl: ModalController, public events: Events, private firebase: Firebase) {
    this.loading = api.makeLoading('Registrarse');
    if(!localStorage.firebase_token) {
      this.firebase.getToken().then(token => localStorage.setItem('firebase_token', token))
      .catch(error => console.error('Error getting token', error));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.loading.present();
    if(this.validater()) {
      let data = {
        firstname: this.name,
        lastname: this.lastname,
        tel: this.tel,
        address: this.address,
        city: this.city,
        province: this.province,
        dni: this.dni,
        email: this.email,
        password: this.password,
        firebase_token: localStorage.firebase_token
      };
      console.log('data : ', data);
      this.api.register(data).then((res) => {
        this.loading.dismiss();
        console.log(res);
        if(res['message'] == "success") {
          this.setMenuProfile(res['data']['user_info']);
          localStorage.setItem('token', res['data']['remember_token']);
          if(res['data']['distributor']) {
            localStorage.setItem('dist', res['data']['distributor']['distributor_id']);            
            this.events.publish('setDistId', res['data']['distributor']['distributor_id']);
          } else {
            localStorage.setItem('dist', '0');            
            this.events.publish('setDistId', 0);
          }
          this.events.publish('setActivedMenuId', 4);
          this.navCtrl.push('DistributorPage');
        } else {
          this.presentModal('Ya existe el correo electrónico');
        }
      }, (err) => {
        this.loading.dismiss();
        console.log('Register error : ', err);
      });
    } else {
      this.loading.dismiss();
      this.presentModal('El formato de correo electrónico no es correcto');
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

  toLogin() {
    this.navCtrl.push('LoginPage');
  }

  setMenuProfile(data) {
    console.log('Login event publish');
    this.events.publish('setMenu', data);
  }

}
