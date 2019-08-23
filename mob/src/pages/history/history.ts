import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HistorydetailPage } from '../historydetail/historydetail';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  
  private baseURI : string  = this.global.mysite; 
  public items : Array<any> = []; 

  public idt : Array<any> = [];
  public showidt:string;

  constructor(public global: GlobalProvider,
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public http     : HttpClient,
    public storage  : Storage ) {
  }
  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
       console.log('Async operation has ended');
       this.ionViewDidLoad();
       //complete()  signify that the refreshing has completed and to close the refresher
       event.complete();
    }, 2000);
 }
 ionPull(event) {
    //Emitted while the user is pulling down the content and exposing the refresher.
    console.log('ionPull Event Triggered!');
 }
 ionStart(event) {
    //Emitted when the user begins to start pulling down.
    console.log('ionStart Event Triggered!');
 }

  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad HistoryPage');
  } 
  load() : void
  {
     this.storage.get('user').then((user) => { 

     let    url : any = this.baseURI+'r_history.php?id='+user;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;

        //ggwp
       // this.idt = this.items.map(go => go.id_transaksi);
        //this.showidt = this.idt[0];



     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
  }
  
  viewEntry(param : any) : void
  {
    this.navCtrl.push(HistorydetailPage, param);
     //idt = idt;
     console.log("idt"+this.idt);
    // this.navCtrl.push('HistorydetailPage', {dataidt: idt});

  }
}
