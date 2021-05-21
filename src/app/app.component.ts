import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';

import { HomePage } from '../pages/home/home';
import { WebApiProvider } from '../providers/web-api/web-api';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  // avatar_root: any = "http://127.0.0.1:8000/avatars/";
  avatar_root: any = "http://sistemasamedida.eawebagency.com/app/NewServer/public/avatars/";
  user: any = {
    id: '',
    image: '',
    firstname: '',
    lastname: '',
    city: '',
    province: '',
    distId: ''
  };
  actived_item : any = 4;
  dist_id: any;
  messages: any;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public events: Events, public api: WebApiProvider, public geolocation: Geolocation, private firebase: Firebase) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.geolocation.watchPosition({ maximumAge: 20, timeout: 20000, enableHighAccuracy: false }).subscribe(
        res=> {
          if(res.coords) {
            localStorage.setItem('lat', '' + res.coords.latitude);
            localStorage.setItem('lng', '' + res.coords.longitude);
          }
        } 
      )
      
      if(localStorage.token) {
        if(localStorage.dist) this.rootPage = 'ProductsPage';
        else this.rootPage = 'DistributorPage';

        this.api.getProfile().then(res => {
          if(res['message'] != 'Invalid token') {
            this.events.publish('setMenu', res['data']['user_info']);
            localStorage.setItem('dist', res['data']['distributor_id']);
            this.events.publish('setDistId', res['data']['distributor_id']);
            this.events.publish('count_message', res['data']['messages']);
          }
        }, err => {
          console.log('Get profile error');
        })
      } else {
        this.firebase.getToken().then(token => localStorage.setItem('firebase_token', token))
        .catch(error => console.error('Error getting token', error));
      }
      
      // this.firebase.onNotificationOpen().subscribe(data => {
      //   if (data.wasTapped) {
      //     //Notification was received on device tray and tapped by the user.
      //     console.log(JSON.stringify(data));
      //     this.nav.setRoot('MessagePage');
      //   } else {
      //     //Notification was received in foreground. Maybe the user needs to be notified.
      //     console.log(JSON.stringify(data));
      //     this.nav.push('MessagePage');
      //   }
      // });
      
      statusBar.styleDefault();
      splashScreen.hide();  
      
      this.dist_id = localStorage.dist;

      this.events.subscribe('setMenu', (data) => {
        this.user = data;
        console.log('Profile : ', this.user);
      });

      this.events.subscribe('updateProfileImg', (data) => {
        this.user.image = data;
      });

      this.events.subscribe('setDistId', (data) => {
        this.dist_id = data;
      });

      this.events.subscribe('setActivedMenuId', (data) => {
        this.actived_item = data;
      });      

      this.events.subscribe('count_message', (data) => {
        this.messages = data;
      })
    });
  }

  toPage(pagename, itemId) {
    console.log('Clicked item is ', localStorage.distId);
    this.actived_item = itemId;
    this.menuCtrl.close();
    if(pagename == 'DetailPage') this.nav.push(pagename, {
      id: localStorage.dist
    });
    else if(pagename == 'LoginPage') {
      localStorage.setItem('token', '');
      localStorage.setItem('lat', '');
      localStorage.setItem('lng', '');
      localStorage.setItem('dist', '0');
      localStorage.setItem('cart', '[]');
      this.nav.push(pagename);
    }
    else this.nav.push(pagename);
  }
}

