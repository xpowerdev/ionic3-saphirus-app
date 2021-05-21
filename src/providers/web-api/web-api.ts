import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the WebApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebApiProvider {

  host: string = "http://127.0.0.1:8000/api/";
  // host: string = "http://sistemasamedida.eawebagency.com/app/NewServer/public/api/";
  url: string;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello WebApiProvider Provider');
  }

  makeLoading(text) {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: text + '...'
    });

    return loading;
  }

  login(data) {
    console.log('Called api login');
    this.url = "auth/login";
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  register(data) {
    console.log('Called register');
    this.url = "auth/register";
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  getDistributors(key, lat, lng) {
    this.url = 'distributor/search/' + key + '/' + lat + '/' + lng;
    console.log('Called getDistributors', this.url);
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token':localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    })
  }

  distributorDetail(id) {
    console.log('Called distributorDetail');
    this.url = "distributor/detail/" + id;
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token':localStorage.token}}).subscribe(res=> {
        resolve(res);
      }, err=> {
        resolve(err);
      });
    })
  }

  getProfile() {
    console.log('Called getProfile');
    this.url = "user/profile";
    return new Promise(resolove => {
      this.http.get(this.host + this.url, {headers: {'token':localStorage.token}}).subscribe(res => {
        resolove(res);
      }, err => {
        resolove(err);
      });
    })
  }

  updateProfile(data) {
    console.log('Called updateProfile');
    this.url = "user/updateProfile";
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  contactDist(data) {
    console.log("Called contactDist");
    this.url = "user/contact";
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data, {headers: {'token':localStorage.token}}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        resolve(err);
      });
    })
  }

  productCategory() {
    console.log("Called productCategory");
    this.url = 'product/category';
    return new Promise(resolve => {
      this.http.get(this.host + this.url).subscribe(res => {
        resolve(res);
      }, err=> {
        resolve(err);
      })
    })
  }

  productsWithCat(category_id) {
    console.log('Called productsWithCat');
    this.url = 'product/list/' + category_id;
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token':localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  getAvrRating() {
    console.log('Called getAvrRating');
    this.url = 'review/averageRating';
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  toProvideReview(data) {
    console.log('Called toProvideReview');
    this.url = 'review/provide';
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  getOrderNo() {
    console.log('Called getOrderNo');
    this.url = 'order/lastOreder';
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  getOrderHistory(data) {
    console.log('Called getOrderHistory');
    this.url = 'order/history/' + data;
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  toOrder(data) {
    console.log('Called toOrder');
    this.url = 'order/store';
    return new Promise(resolve => {
      this.http.post(this.host + this.url, data, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  getAllMessage() {
    console.log('Called getAllMessage');
    this.url = 'message/show';
    return new Promise(resolve => {
      this.http.get(this.host + this.url, {headers: {'token': localStorage.token}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

}
