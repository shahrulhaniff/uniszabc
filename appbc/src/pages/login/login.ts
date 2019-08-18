import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading, AlertController, Events } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DisplayPage } from '../display/display';
import { GlobalProvider } from "../../providers/global/global";
//import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import {Md5} from 'ts-md5/dist/md5';

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
  kodpengguna = "";
  shownama = "";
  

  constructor(public global: GlobalProvider,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public http       : HttpClient,
              private alertCtrl : AlertController,
              public fb         : FormBuilder,
              private loadingCtrl: LoadingController,
              public storage : Storage,
              public events: Events
              /*private modal: ModalController */
              ) {
    /* Buat validation */
    this.form = fb.group({
      "username"    : ["", Validators.required],
      "password"    : ["", Validators.required]
   });
  }

  /* komen dulu dan cancel penggunaannya untuk future use
  openModal() {
    const myModal = this.modal.create('ModalPage');
    myModal.present();
  } */

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
        //this.createSuccess = true;
        //this.usrid = record.usr;
        //this.usrid = this.fetch.map(fetch => fetch.auth); //xjadi dia undefine map. salah ni..
        
        if (record=='Granted') {
          //simpan login user dalam storage
          this.storage.set('user', this.usrid);
          this.showPopup("Selamat Datang","Akses diterima");
          this.storage.set('kod_pengguna', '1');
          this.kodpengguna = "1";
          this.events.publish('user:2'); // user:1 = User, user:2 = admin, user:3 = subadmin
          this.storage.get('user').then((user) => { console.log("simpan storage "+user); });
          this.navCtrl.setRoot(DisplayPage, { data: this.usrid });

        }
        else if (record=='Granted2'){ 
          /*this.openModal();*/
          this.storage.set('test', this.usrid); 
          console.log("nak masuk dekat test "+this.usrid);
          this.navCtrl.setRoot(ModalPage);
        }
        
        else if (record=='Denied'){
          this.showError("Kata Laluan Salah");
          this.navCtrl.setRoot(LoginPage);
        }
        else {
          this.showError("Akaun tidak wujud");
          this.navCtrl.setRoot(LoginPage);
        }
      },
      error => {
        this.showPopup("Tiada sambungan internet/server", "Sila cuba sekali lagi.");
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
      content: 'Sila tunggu...',
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
      title: 'Akses tidak diterima',
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
  public ntdataarray : Array<any> = [];
  getSessionUser() {
      let usrform: any = this.form.controls["username"].value;
      let    url : any = this.baseURI+'getNoKp.php?id='+usrform;
      this.http.get(url).subscribe((data2 : any) =>
      {
         console.dir(data2);
         this.profiles = data2;
         this.icdataarray = this.profiles.map(profiles => profiles.ic_pengguna);
         this.nmdataarray = this.profiles.map(profiles => profiles.nama);
         this.emdataarray = this.profiles.map(profiles => profiles.email);
         this.ntdataarray = this.profiles.map(profiles => profiles.no_telefon);

        if(this.profiles.length!=0){
        for(let i = 0; i < this.profiles.length; i++){
          if(
            (usrform == this.icdataarray[i])||
            (usrform == this.nmdataarray[i])||
            (usrform == this.emdataarray[i])||
            (usrform == this.ntdataarray[i])
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
          this.showError("Akaun tidak wujud");
          this.navCtrl.setRoot(LoginPage);
        }


      },
      (error : any) =>
      {
         console.dir(error);
      });
  }
  // #############################################################################
  // #############################################################################
  // #############################################################################



}
