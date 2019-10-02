import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Toast } from '@ionic-native/toast/ngx';
import { GlobalProvider } from '../providers/global/global';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepassPage } from '../pages/changepass/changepass';
import { IonTextAvatar } from 'ionic-text-avatar';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ParallaxHeader } from '../directives/parallax-header/parallax-header';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { ClaimPage } from '../pages/claim/claim';
import { MycertPage } from '../pages/mycert/mycert';
import { HistoryPage } from '../pages/history/history';
import { PenafianPage } from '../pages/penafian/penafian';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TextAvatarDirective,
    SearchPipe,
    SortPipe,
    ProfilePage,
    HistoryPage,
    EditprofilePage,
    ChangepassPage,
    IonTextAvatar,
    HubungiPage,
    ClaimPage,
    MycertPage,
    PenafianPage,
    ParallaxHeader
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    HistoryPage,
    EditprofilePage,
    ChangepassPage,
    HubungiPage,
    ClaimPage,
    MycertPage,
    PenafianPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    GlobalProvider,
    InAppBrowser,
    File,
    FileOpener
    

  ]
})
export class AppModule {}
