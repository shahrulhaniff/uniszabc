import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DisplayPage } from '../display/display';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  navToHome() {
    this
      .navCtrl
      .push(HomePage);
  }
  
  navToList() {
    this
      .navCtrl
      .push(DisplayPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
