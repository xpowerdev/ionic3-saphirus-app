import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the DistributorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distributor',
  templateUrl: 'distributor.html',
})
export class DistributorPage {
  root: any;
  tab1Root = 'ListPage';
  tab2Root = 'MapPage';

  list_img: any;
  map_img: any;
  flag: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) { 
    this.root = this.tab1Root;  
    this.list_img = "list-active";
    this.map_img = "map";
    this.flag = true; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributorPage');
    this.events.publish('setActivedMenuId', 4);
  }
  
  list() {
    this.root = this.tab1Root;
    this.list_img = "list-active";
    this.map_img = "map";
    this.flag = true;
  }

  map() {
    this.root = this.tab2Root;
    this.list_img = "list";
    this.map_img = "map-active";
    this.flag = false;
  }

}
