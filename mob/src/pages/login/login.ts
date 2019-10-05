import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, LoadingController,Loading, AlertController, Events } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { StartPage } from '../start/start';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usrid    : any;
  public nama : any;
  public items    : Array<any> = [];
  public fetch    : any; // fetch one data value only from php server unlike items
  public form     : FormGroup;
  private baseURI : string  = this.global.mysite; //ok dah tukar, satu tempat je tukar lepasni
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  createSuccess = false;
  //kodpengguna = "";
  shownama = "";
  
  constructor(public global: GlobalProvider,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public http       : HttpClient,
              private alertCtrl : AlertController,
              public fb         : FormBuilder,
              private loadingCtrl: LoadingController,
              public storage : Storage,
              public events: Events,
              public menuCtrl: MenuController
              /*private modal: ModalController */
              ) {
                 this.menuCtrl.enable(false, 'myMenu');
    /* Buat validation */
    this.form = fb.group({
      "username"    : ["", Validators.required],
      "password"    : ["", Validators.required]
   });
  }

  public usrdb : Array<any> = [];
  public pwddb : Array<any> = [];
  
  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }


   public login() : void {
    console.log("PROVLEM",this.icdata);
      let usr     : string    = this.icdata,
          pwd     : string    = this.form.controls["password"].value;
    console.log('usr-->', usr , 'pwd-->', pwd);

    this.showLoading();
      let headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any	= { "usr" : usr, "pwd" : pwd },
          url       : any = this.baseURI + "login.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) => 
      {
        this.usrid = usr;
        console.log("this.usrid pgg value usr-->"+this.usrid);
        // If the request was successful notify the user
        if (record=='Granted') {
          //simpan login user dalam storage
          this.storage.set('user', this.usrid);
          this.showPopup("Welcome","Access Granted");
          //this.storage.set('kod_pengguna', '1');
          //this.kodpengguna = "1";
          this.events.publish('user:2');
          this.storage.get('user').then((user) => { console.log("simpan storage "+user); });
          this.navCtrl.setRoot(StartPage, { data: this.usrid });
        }
        else if (record=='Denied'){
          this.showError("Check your password");
          this.navCtrl.setRoot(LoginPage);
        }
        else {
          this.showError("Account not exist");
          this.navCtrl.setRoot(LoginPage);
        }
      },
      error => {
        this.showPopup("No Connection..", "Please try again.");
        //this.showError(error);
        console.log("Oooops!");
        console.log(error);
        this.loading.dismiss();
        //this.navCtrl.push(LoginPage); kene buuat setroot
      });
      
  }




  //showloading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  //Untuk Popup
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
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Wait..',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  load() : void
  {
     this.http
     .get(this.baseURI + 'login.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }

  public showuser : any;
  ionViewDidLoad() {
    this.storage.get('user').then((user) => {
      console.log("simpan storage "+user);
      this.showuser = user;
    });
    console.log('ionViewDidLoad LoginPage-->'+this.showuser);
    //this.load(); kita takyah load data dulu nati berat

    this.storage.get('nama').then((nama) => {this.shownama = nama; });
  }

// #############################################################################
// #############################################################################
// #############################################################################
  public profiles : Array<any> = [];
  icdata ="";
  public icdataarray : Array<any> = [];
  public nmdataarray : Array<any> = [];
  public emdataarray : Array<any> = [];
  public certdataarray : Array<any> = [];
  getSessionUser() {
      let usrform: any = this.form.controls["username"].value;
      let url : any = this.baseURI+'getSessionUser.php?id='+usrform;
      this.http.get(url).subscribe((data2 : any) =>
      {
         console.dir(data2);
         this.profiles = data2;
         this.icdataarray = this.profiles.map(profiles => profiles.usrid);
         this.nmdataarray = this.profiles.map(profiles => profiles.nama);
         this.emdataarray = this.profiles.map(profiles => profiles.email);
         this.certdataarray = this.profiles.map(profiles => profiles.cert);

        if(this.profiles.length!=0){
        for(let i = 0; i < this.profiles.length; i++){
          if(
            (usrform == this.icdataarray[i])||
            (usrform == this.nmdataarray[i])||
            (usrform == this.emdataarray[i])||
            (usrform == this.certdataarray[i])
            ){
            this.icdata = this.icdataarray[i];
            console.log("__________MISSION________________");
            console.log("MISSION ACCOMPALISHED",this.icdata);
            this.login();
            break;
          }
        }

      }
        else {
          this.showLoading();
          this.showError("Account not Exist");
          this.navCtrl.setRoot(LoginPage);
        }

      },
      (error : any) =>
      {
        this.showLoading();
        this.showError("Check your internet");
         console.dir(error);
      });
  }
  // #############################################################################
  // #############################################################################
  // #############################################################################

  scan(): void {
    this.navCtrl.push('ScanPage');
 }
}
