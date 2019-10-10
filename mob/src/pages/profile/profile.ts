import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient } from '@angular/common/http';
import { Observable } from "./../../../node_modules/rxjs/Observable";
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';
import { ChangepassPage } from '../changepass/changepass';
import { ListPage } from '../list/list';
import { StartPage } from '../start/start';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public items : Array<any> = [];
  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 
 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public menuCtrl: MenuController,
              public storage  : Storage) {
         this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewWillEnter() {
    //this.load();
    console.log('ionViewDidLoad ProfilePage');
  }

  kodpengguna = "";

 /* load() : void
  {
    this.storage.get('kod_pengguna').then((kod_pengguna) => { 
    this.kodpengguna = kod_pengguna; console.log("session kod pengguna dekat profile",kod_pengguna);
    }); //close storage

     this.storage.get('user').then((user) => {

     let    url : any = this.baseURI+'retrieve_profile.php?id='+user+'&kodpengguna='+this.kodpengguna;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.profiles = data;
        
        
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
  } */

  editProfile(params : any){
    this.navCtrl.push(EditprofilePage, params);
  }

  changePass(params : any){
    this.navCtrl.push(ChangepassPage, params);
  }
  certinfo(params : any){
    this.navCtrl.push(StartPage, params);
  }
  
  scan(): void {
    this.navCtrl.push('ScanPage');
 }
 logout(): void {
    this.navCtrl.push(ListPage);
 }

 getPtj() {

  let url = '../../assets/jsonfile/russel.json';
  let data: Observable<any> = this.http.get(url);
  data.subscribe(result => {
    this.items = result;
  });

}

}
