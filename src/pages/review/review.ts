import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  distributor_id: any;
  avrRating: any = ' ';

  review:any;
  rating:any;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public api: WebApiProvider, public events: Events) {
    this.distributor_id = this.navParams.get('distributor_id');
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    this.api.getAvrRating().then(res => {
      this.avrRating = res['data'];
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log('Get average rating error : ', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  addRating(rating) {
    this.rating = rating;
  }

  provideReview() {
    if(this.review != null && this.rating != null) {
      this.loading = this.api.makeLoading('Cargando');
      this.loading.present();
      let data = {
        to: this.distributor_id,
        review: this.review,
        rating: this.rating
      }
      this.api.toProvideReview(data).then(res => {
        this.avrRating = res['data'];
        this.events.publish('addCart', 0);
        this.rating = null; 
        this.review = null;
        this.loading.dismiss();
        this.navCtrl.push('ProductsPage');
      }, err => {
        this.loading.dismiss();
        console.log('Provide review error : ', err);
      })
    } else {
      let message = 'Por favor ingrese calificación y revisión';
      if(this.review == null && this.rating != null) message = 'Por favor ingrese la revisión';
      else if(this.review != null && this.rating == null) message = 'Por favor ingrese la calificación';
      let alert = this.modalCtrl.create('AlertModalPage', {
        title: 'Atención',
        message: message,
        button: 'DE ACUERDO'
      });
      alert.present();
    }
  }
}
