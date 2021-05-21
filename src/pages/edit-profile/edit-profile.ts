import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  main_menu: any = {
    menu: false,
    cart: false
  }

  data: any;
  tempData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: WebApiProvider) {
    this.data = this.navParams.get('data');
    this.tempData = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  update() {
    let loading = this.api.makeLoading('Cargando');
    loading.present();
    let profile = {
      email: this.data.email,
      tel: this.data.tel,
      dni: this.data.dni,
      address: this.data.address,
      city: this.data.city,
      province: this.data.province
    }
    console.log('profile', profile);
    this.api.updateProfile(profile).then(res => {
      loading.dismiss();
      this.navCtrl.pop();
    }, err => {
      loading.dismiss();
    })
  }

  back() {
    this.navCtrl.push('ProfilePage');
  }

}
