import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartPage } from '../start/start';


@IonicPage()
@Component({
  selector: 'page-mycert',
  templateUrl: 'mycert.html',
})
export class MycertPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycertPage');
  }

  cancel(){
    this.navCtrl.setRoot(StartPage);
  }
}
