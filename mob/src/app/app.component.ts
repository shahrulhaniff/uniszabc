import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { DisplayPage } from '../pages/display/display';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { HubungiPage } from '../pages/hubungi/hubungi';


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
      else {this.rootPage=ProfilePage;
      };

     /*
      // TUKAR DARI IC GUNA SET ROLE kod_pengguna ++++++++++++++++++++++++++++++++ MUHAIMIN 1 +++++++++++++++++++++++++++++
      if(user=='941013115436') {
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Utama', component: DisplayPage },
          { title: 'Profil', component: ProfilePage },
          { title: 'Aktiviti Transaksi', component: HistoryPage },
          { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
          { title: 'Log Keluar', component: ListPage }
        ];
             }
             else if(user=='941013115435') {
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Utama', component: DisplayPage },
          { title: 'Profil', component: ProfilePage },
          { title: 'Aktiviti Transaksi', component: HistoryPage },
          { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
          { title: 'Senarai Sebut Harga', component: Kodtransaksi2Page }, // +++++++++++++++ nanti bila dah tambah yang selain JPP guna menu ni MUHAIMIN 3 +++++++++++++++++
          { title: 'Log Keluar', component: ListPage }
        ];
             }
             //tambah satu lagi THIS.PAGES untuk sub-admin selain jpp ++++++++++++++++++++++++++++++ MUHAIMIN 2 +++++++++++++++
    */
    });//close storage


    //kalau jadi menu authorize based on user diatas sila komen/buang kod this.pages dibawah ini.
    // used for an example of ngFor and navigation
    /*this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'Start', component: StartPage },
      //{ title: 'List', component: ListPage }, //dah guna untuk logout
      { title: 'Utama', component: DisplayPage },
      { title: 'Profil', component: ProfilePage },
      { title: 'Aktiviti Transaksi', component: HistoryPage },
      { title: 'Senarai Sebut Harga', component: KodtransaksiPage },
      { title: 'Log Keluar', component: ListPage }
    ];*/


    /*
    //Call side menu for USER
    events.subscribe('user:1',()=>{
      this.pages = [
        { title: 'Utama', component: DisplayPage, Icon :'home'  },
        { title: 'Profil', component: ProfilePage, Icon :'ios-home-outline' },
        { title: 'Transaksi', component: HistoryPage, Icon :'ios-home-outline' },
        { title: 'Log Keluar', component: ListPage, Icon :'ios-home-outline' }
      ];
    });
    

    //Call side menu for ADMIN
    events.subscribe('user:2',()=>{
      this.pages = [
        { title: 'Utama', component: DisplayPage, Icon :'ios-home-outline' },
        { title: 'Profil', component: ProfilePage , Icon :'ios-home-outline'},
        { title: 'Aktiviti Transaksi', component: HistoryPage, Icon :'ios-home-outline' },
        { title: 'Log Keluar', component: ListPage, Icon :'ios-home-outline' }
      ];
    });

    //Call side menu for SUB-ADMIN
    events.subscribe('user:3',()=>{
      this.pages = [
        { title: 'Utama', component: DisplayPage, Icon :'ios-home-outline' },
        { title: 'Profil', component: ProfilePage , Icon :'ios-home-outline'},
        { title: 'Aktiviti Transaksi', component: HistoryPage , Icon :'ios-home-outline'},
        { title: 'Log Keluar', component: ListPage, Icon :'ios-home-outline' }
      ];
    });

*/
    this.storage.get('kod_pengguna').then((kod_pengguna) => {
      console.log("KALAU HILANG MENU, NOTE VALUE INI ->",kod_pengguna);

     // Side menu for User
    if(kod_pengguna ='1') {
      this.pages = [
        //{ title: 'Utama', component: DisplayPage , Icon :'home'},
        { title: 'Profile', component: ProfilePage , Icon :'person'},
        { title: 'My Certificate', component: HistoryPage , Icon :'ios-ribbon'},
        { title: 'Contact Us', component: HubungiPage, Icon :'call' },
        { title: 'Sign Out', component: ListPage, Icon :'log-out' }
      ];
    }/*
    // Side menu for Admin
    else if(kod_pengguna =='2') {
      this.pages = [
        { title: 'Utama', component: DisplayPage, Icon :'home' },
        { title: 'Profil', component: ProfilePage, Icon :'person' },
        { title: 'Aktiviti Transaksi', component: HistoryPage, Icon :'repeat' },
        //{ title: 'Senarai Sebut Harga', component: KodtransaksiPage, Icon :'ios-home-outline' },
        //{ title: 'Senarai Sebut Harga', component: Kodtransaksi2Page, Icon :'ios-home-outline' }, 
        { title: 'Log Keluar', component: ListPage, Icon :'log-out' }
      ];
    }
    // Side menu for Subadmin
    else if(kod_pengguna =='3') {
      this.pages = [
        { title: 'Utama', component: DisplayPage, Icon :'home' },
        { title: 'Profil', component: ProfilePage , Icon :'person'},
        { title: 'Aktiviti Transaksi', component: HistoryPage , Icon :'repeat'},
        //{ title: 'Senarai Sebut Harga', component: KodtransaksiPage, Icon :'ios-home-outline' },
        //{ title: 'Senarai Sebut Harga', component: Kodtransaksi2Page, Icon :'ios-home-outline' }, 
        { title: 'Log Keluar', component: ListPage, Icon :'log-out' }
      ];
    }*/
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


  
  namadata =""; /*
  public namadataarray : Array<any> = [];
  getNama () {
    this.platform.ready().then(() => {
   this.storage.get('nama').then((nama) => {this.namadata = nama;
      console.log("____namadata dekat app component ts_____",this.namadata);
    }); 
  }); 
  } */

}
