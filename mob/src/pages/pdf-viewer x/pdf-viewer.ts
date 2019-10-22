import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,ViewController ,App } from 'ionic-angular';
import { StartPage } from '../start/start';

@IonicPage()
@Component({
  selector: 'page-pdf-viewer',
  templateUrl: 'pdf-viewer.html',
})
export class PdfViewerPage {

  displayData: any = {};
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public viewCtrl: ViewController,
              public appCtrl: App) {
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfViewerPage');
    
    this.displayData = this.navParams.get('displayData');
  }

  close(){
    //this.navCtrl.push(StartPage);
    //this.navCtrl.setRoot(StartPage);
    this.viewCtrl.dismiss().then(() => {
    //this.navCtrl.setRoot(StartPage);
    this.appCtrl.getRootNav().setRoot(StartPage);
  });
  }
}
