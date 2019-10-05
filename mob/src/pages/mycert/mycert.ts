import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,Loading } from 'ionic-angular';
import { StartPage } from '../start/start';


@IonicPage()
@Component({
  selector: 'page-mycert',
  templateUrl: 'mycert.html',
})
export class MycertPage {

  loading: Loading;
  createSuccess = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl : AlertController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycertPage');
  }

  cancel(){
    this.navCtrl.setRoot(StartPage);
  }


  //showloading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  //Untuk Popup
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  popup(){
    this.showLoading();
    this.showPopup("Congratulations", "Certificate Claimed");
    this.loading.dismiss();
  }
  
}
