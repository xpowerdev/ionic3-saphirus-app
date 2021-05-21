import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Events, App } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { WebApiProvider } from './../../providers/web-api/web-api';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers : any = [];
  circle: any;
  watchPos: any;

  data: any;
  distId: any;
  
  loading: any;

  main_menu: any = {
    menu: true,
    cart: localStorage.dist != '0'? true : false,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation, 
    public modalCtrl: ModalController, public api: WebApiProvider, public events: Events, public app: App) {      
    this.platform.ready().then(
      res => {
        this.loadMap();
			},
			err => {
				console.log('Error platform not ready');
			}
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.watchPos = this.geolocation.watchPosition({ maximumAge: 20, timeout: 20000, enableHighAccuracy: false }).subscribe(
      res=> {
        console.log('Update geolocation');
        if(res.coords) {
          localStorage.setItem('lat', '' + res.coords.latitude);
          localStorage.setItem('lng', '' + res.coords.longitude);
        }
      } 
    )
  }

  loadMap(){
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();

    if(!localStorage.lat || !localStorage.lng)  {
      console.log("App didn't get geolocation in map");
      let position = this.geolocation.watchPosition({ maximumAge: 20, timeout: 20000, enableHighAccuracy: false }).subscribe(
        res=> {
          if(res.coords) {
            localStorage.setItem('lat', '' + res.coords.latitude);
            localStorage.setItem('lng', '' + res.coords.longitude);    
            
            // localStorage.setItem('lat', '-34.443956');
            // localStorage.setItem('lng', '-58.823721');

            this.engine('all');
            position.unsubscribe();
            console.log('init watch stopped in map');
          } else {
            this.loading.dismiss();
            position.unsubscribe();
            console.log('init watch stopped in map');
          }
        }
      )
    } else {
      console.log("App got geolocation in map");
      this.engine('all');
    }

    let m_location = new google.maps.LatLng(localStorage.lat, localStorage.lng);

    let mapOptions = {
      center: m_location,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.circle = new google.maps.Circle({
      strokeColor: '#c6c5e9',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#ccdde3',
      fillOpacity: 0.35,
      center: m_location,
      radius: 50 * 1000
    }); 
  }
  
  startSearch(event) {
    if(event) {
      this.loading = this.api.makeLoading('Cargando');
      this.loading.present();
      this.clearMarkers();
      this.engine(event);
    }    
  }

  engine(event) {
    console.log('Search key is ', event);
    this.api.getDistributors(event, localStorage.lat, localStorage.lng).then((res) => {
      this.loading.dismiss();
      console.log('Map marker data = ', res);
      this.data = res['data']['lists'];
      this.distId = res['data']['distributor_id'];
      this.map.setCenter(new google.maps.LatLng(localStorage.lat, localStorage.lng));
      if(event == 'near') {
        this.circle.setMap(this.map);
        this.map.setZoom(8);
      } else {
        this.circle.setMap(null);
        this.map.setZoom(5);
      }
      if(this.data) {
        this.addMarkers(this.data);
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }

  addMarkers(data) {
    for(let i = 0; i < data.length; i++) {
      let location = new google.maps.LatLng(data[i]['lat'], data[i]['lng']);          

      let mark = new google.maps.Marker({
        position : location,
        icon: { 
          url:'assets/imgs/marker.png', 
          scaledSize: new google.maps.Size(25, 36),
        },
        map: this.map
      });

      let self = this;
      google.maps.event.addListener(mark, 'click', function() {
        console.log('Marker clicked');
        self.presentModal(data[i]);
      });
      this.markers.push(mark);
    }
  }

  clearMarkers() {
    for(let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  
  presentModal(data) {
    
    // let testModal = this.modalCtrl.create(MItem4Component);
    // testModal.present();

    let modalList = this.modalCtrl.create('ListModalPage', {
      id: data['id'],
      name: data['name'],
      city: data['city'],
      province: data['province'],
      rating: data['rating'],
      is_visible: data['is_visible']
    });
    modalList.present();
    modalList.onDidDismiss((btn_id)=>{
      if(btn_id == 1) {
        this.app.getRootNav().setRoot('DetailPage', {'id': data['id']});
      } else if(btn_id == 2) {
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
                  modalAlert.present();
                  localStorage.setItem('dist', data['id']);                
                  this.events.publish('setDistId', data['id']);
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
    });
  }

  ionViewDidLeave() {
    this.watchPos.unsubscribe();
  }
}

