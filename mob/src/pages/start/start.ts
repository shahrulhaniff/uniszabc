import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { MycertPage } from '../mycert/mycert';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AnimationService, AnimationBuilder } from 'css-animator';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(public navCtrl  : NavController, 
              public http     : HttpClient,
              public navParams: NavParams,
              public global   : GlobalProvider,
              public menuCtrl: MenuController,
              public storage  : Storage) {
              this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    this.load();
  }

  kodpengguna = "";

  load() : void
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
  }
  
  claim(params : any){
    this.navCtrl.push(MycertPage, params);
  }

}
