import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { PenafianPage } from '../pages/penafian/penafian';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  
  private user: any;

  pages: Array<{title: string, component: any,Icon:any}>;


  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private storage: Storage,
              public events: Events) {


                events.subscribe('user:created', (user) => {
                  this.namadata=user;
                  console.log("GUNA EVENTS.SUBSCRIBE utk ubah value@app.component.ts:",user);
                });





    //this.initializeApp();
    //this.getNama();
    //One time Login Purposes
    this.storage.get('user').then((user) => {
      this.user = user; console.log("data kat dalam app.co-->"+this.user);
      
      if(this.user==null) { this.rootPage =LoginPage;}
      else {this.rootPage=StartPage;
      };


    });//close storage

    this.storage.get('kod_pengguna').then((kod_pengguna) => {
      console.log("KALAU HILANG MENU, NOTE VALUE INI ->",kod_pengguna);

     // Side menu for User test
    if(kod_pengguna ='1') {
      this.pages = [
        { title: 'My Certificate', component: StartPage , Icon :'ios-ribbon-outline'},
        { title: 'Profile', component: ProfilePage , Icon :'person'},
        { title: 'Scan QR', component: 'ScanPage', Icon :'md-qr-scanner' },
        //{ title: 'My Certificate', component: HistoryPage , Icon :'ios-ribbon'},
        { title: 'Contact Us', component: HubungiPage, Icon :'call' },
        { title: 'Disclaimer', component: PenafianPage, Icon :'md-checkmark-circle-outline' },
        { title: 'Sign Out', component: ListPage, Icon :'log-out' }
      ];
    }
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  namadata ="";

}