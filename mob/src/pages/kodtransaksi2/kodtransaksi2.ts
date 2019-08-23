import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PayPage } from '../pay/pay';

@IonicPage()
@Component({
  selector: 'page-kodtransaksi2',
  templateUrl: 'kodtransaksi2.html',
})
export class Kodtransaksi2Page {
  
  public form : FormGroup;
  private baseURI : string  = this.global.mysite;
  private uid : string ;

  //start hide
  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = true;
  public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.buttonClicked2 = !this.buttonClicked2;
      console.log("hide n show");
  }

  
  public add: boolean = true;
  public onclickadd() {
    this.add = !this.add;
      console.log("hide n show");
  }
  //done hide

  public items : Array<any> = [];
  public trans : Array<any> = [];
  descending: boolean = false;
  order: number;

  myDate: String = new Date().toISOString();

  constructor(public navCtrl  : NavController, 
              public global   : GlobalProvider,
              public navParams: NavParams,
              public http     : HttpClient,
              public storage  : Storage,
              public fb       : FormBuilder,
              public toastCtrl : ToastController) {

      // Create form builder validation rules
      this.form = fb.group({
        "no_sb"        : ["", Validators.required],
        "description"  : ["", Validators.required],
        "tarikhbuka"   : ["", Validators.required],
        "tarikhtutup"  : ["", Validators.required],
        "jam"          : ["", Validators.required],
        "harga"        : ["", Validators.required],
        "id_jenistransaksi" : ["", Validators.required],
        "kelas"        : ["", Validators.required]
     });
  }

  ionRefresh(event) {
   console.log('Pull Event Triggered!');
   setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
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

  ionViewWillEnter() {
    this.load_table(); 
  }
  
  load_table() : void
  {
     this.storage.get('user').then((user) => { this.uid = user;
     let    url : any = this.baseURI+'retrieve_kodtransaksi.php?id='+user;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage


   //load kod id jenis transaksi dari database untuk tujuan select lookup
   let    url : any = this.baseURI+'retrieve_idjenistransaksi.php';     
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.trans = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }

  
   /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   saveEntry() : void
   {
      
      this.storage.get('kod_pengguna').then((kod_pengguna) => { //buka storage
      let no_sb   : string = this.form.controls["no_sb"].value,
      description : string = this.form.controls["description"].value,
      tarikhbuka  : string = this.form.controls["tarikhbuka"].value,
      tarikhtutup : string = this.form.controls["tarikhtutup"].value,
      jam         : string = this.form.controls["jam"].value,
      harga       : string = this.form.controls["harga"].value,
      id_jenistransaksi: string = this.form.controls["id_jenistransaksi"].value,
      kelas       : string = this.form.controls["kelas"].value,
      uid : string = this.uid;

         this.createEntry(no_sb, description, tarikhbuka,tarikhtutup, jam, harga,id_jenistransaksi, kelas, uid, kod_pengguna);
      }); /* tutup storage kod_pengguna*/ 
   }
   
   createEntry( no_sb       : string, 
                description : string, 
                tarikhbuka  : string,
                tarikhtutup : string, 
                jam         : string, 
                harga       : string,
                id_jenistransaksi : string, 
                kelas       : string,
                uid       : string,
                kod_pengguna       : string) : void
   {
      this.storage.get('user').then((user) => { //buka storage
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "no_sb" : no_sb, "description" : description, "tarikhbuka" : tarikhbuka, "tarikhtutup" : tarikhtutup, "jam" : jam, "harga" : harga, "id_jenistransaksi" : id_jenistransaksi, "kelas" : kelas, "uid" : uid , "kod_pengguna" : kod_pengguna },
          url       : any   	= this.baseURI + "add_kodtransaksi.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.add = true;
         this.sendNotification(`Rekod: ${no_sb} berjaya ditambah`);
      },
      (error : any) =>
      {
         this.sendNotification('Sesuatu tidak kena');
         console.log("simpan database "+ tarikhbuka ); 
      });

   console.log("simpan storage "+user); }); /* tutup storage user*/ 
   }
  
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
  
   /**
    * Manage notifying the user of the outcome of remote operations
    *
    * @public
    * @method sendNotification
    * @param message 	{String} 			Message to be displayed in the notification
    * @return {None}
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

   pay(id_kodtransaksi) {
      id_kodtransaksi = id_kodtransaksi || 'Ada kesilapan';
  
      this.navCtrl.push(PayPage, {
        data: id_kodtransaksi
      });
    }

}
