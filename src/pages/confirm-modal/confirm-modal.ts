import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ConfirmModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-modal',
  templateUrl: 'confirm-modal.html',
})
export class ConfirmModalPage {

  title: any;
  message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.title = this.navParams.get('title');
    this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmModalPage');
  }

  confirm() {
    this.viewCtrl.dismiss(1);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
