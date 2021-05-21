import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the ListModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-modal',
  templateUrl: 'list-modal.html',
})
export class ListModalPage {

  levelArr: any = [
    "BRONCE", "ORO", "PLATINO"
  ];
  id: any;
  level: any;
  name: any;
  city: any;
  province: any;
  rating: any;
  star: any;
  is_visible: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public modalCtrl: ModalController) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.city = this.navParams.get('city');
    this.province = this.navParams.get('province');
    this.rating = this.navParams.get('rating');
    this.star = this.rating / 2;
    this.is_visible = this.navParams.get('is_visible');
    if(this.rating == 0) this.level = '';
    else if(this.rating > 0 && this.rating <= 5) this.level = this.levelArr[0];
    else if(this.rating >= 9) this.level = this.levelArr[2];
    else this.level = this.levelArr[1];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListModalPage');
  }

  toDetail() {
    this.viewCtrl.dismiss(1);
  }

  confirm() {
    this.viewCtrl.dismiss(2);
  }

}
