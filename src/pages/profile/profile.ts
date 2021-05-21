import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { WebApiProvider } from '../../providers/web-api/web-api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  main_menu: any = {
    menu: true,
    cart: localStorage.dist != '0'? true : false,
  };
  user: any;

  imageURI:any;
  loading: any;

  // avatar_root: any = "http://127.0.0.1:8000/avatars";
  avatar_root: any = "http://sistemasamedida.eawebagency.com/app/NewServer/public/avatars/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: WebApiProvider, public camera: Camera, public transfer: FileTransfer, public loadingCtrl: LoadingController, public events: Events) {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    this.api.getProfile().then(res => {
      this.user = res['data']['user_info'];
      this.events.publish('setMenu', this.user);
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getImage() {
    console.log('getImage');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      console.log('data format : ', this.imageURI);
      this.uploadFile();
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile() {
    this.loading = this.api.makeLoading('Cargando');
    this.loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {
        token: localStorage.token
      }
    }
  
    fileTransfer.upload(this.imageURI, 'http://sistemasamedida.eawebagency.com/app/NewServer/public/api/user/updateImage', options).then((data) => {
      let temp = JSON.stringify(data);
      console.log("Uploaded Successfully", temp);
      let res = JSON.parse(temp).response;
      this.user['image'] = JSON.parse(res).image;
      this.loading.dismiss();
      this.events.publish('updateProfileImg', this.user['image']);
    }, (err) => {
      console.log(err);
    });
  }

  toEdit() {
    this.navCtrl.push('EditProfilePage', {
      data: this.user
    });
  }

}
