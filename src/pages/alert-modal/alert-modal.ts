import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the AlertModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert-modal',
  templateUrl: 'alert-modal.html',
})
export class AlertModalPage {

  title: any;
  message: any;
  button: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.title = navParams.get('title');
    this.message = navParams.get('message');
    this.button = navParams.get('button');
    console.log('test point : ', this.title);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertModalPage');
  }

  dismiss() {
    console.log('Dismiss modal1');
    this.viewCtrl.dismiss();
  }

}
