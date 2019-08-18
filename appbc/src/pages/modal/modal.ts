import { Component, transition } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,Loading, AlertController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DisplayPage } from '../display/display';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  createSuccess = false;

  private baseURI : string  = this.global.mysite;
  public items : Array<any> = [];
  public test : string;
  public form : FormGroup;
  public jen : Array<any> = [];
  public kodp : Array<any> = [];
  public showkp : string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private storage: Storage,
    public global   : GlobalProvider,
    public http     : HttpClient,
    private alertCtrl : AlertController,
    public fb       : FormBuilder,
    public events: Events) {

      //Declare formfontrol name
      this.form = fb.group({
        "masuk" : ["", Validators.required]
     });
  }
  

  closeModal(){
    //this.view.dismiss();
    this.showPopup("Batal", "Sesi masuk dihapuskan");
    this.navCtrl.setRoot(LoginPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.storage.get('test').then((test) => { console.log("siapa storage test"+test); this.test = test; 
    //load kod id jenis transaksi dari database untuk tujuan select lookup
   let    url : any = this.baseURI+'retrieve_kodpengguna.php?id='+this.test; 
   console.log('url debug' + url);    
   this.http.get(url).subscribe((data : any) =>
   {
      console.dir(data);
      this.items = data;
   },
   (error : any) =>
   {
      console.dir(error);
   });
  });//close storage test

  }

  
  saveEntry() : void
  {
    let kod_pengguna   : string = this.form.controls["masuk"].value;
     this.storage.set('kod_pengguna', kod_pengguna);

          this.storage.get('test').then((test) => { 
            this.storage.set('user', test); console.log('user' + test);
           });

           
          this.kodp = this.items.map(go => go.kod_pengguna);
          this.jen = this.items.map(go => go.jenis_pengguna);
          console.log('uuuuuuuuuuuu: ',  this.items.map(go => go.kod_pengguna));

          for (let i = 0; i <= this.items.length; i++) {
          if (kod_pengguna == this.kodp[i]) {
            this.showkp = this.jen[i];
          }
        }
           
          this.showPopup("Diterima", this.showkp);
          this.navCtrl.setRoot(DisplayPage, { data: kod_pengguna });
          this.events.publish('user:'+kod_pengguna); // user:1 = User, user:2 = admin, user:3 = subadmin
  }

}
