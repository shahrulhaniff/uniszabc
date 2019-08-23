import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DisplayPage } from '../display/display';
import { HistoryPage } from '../history/history';

@IonicPage()
@Component({
  selector: 'page-migs',
  templateUrl: 'migs.html',
})
export class MigsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private inAppBrowser : InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MigsPage');
  }
  home(){
    this.navCtrl.setRoot(HistoryPage);
  }
}
