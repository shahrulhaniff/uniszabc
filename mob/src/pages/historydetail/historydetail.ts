import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-historydetail',
  templateUrl: 'historydetail.html',
})
export class HistorydetailPage {

  pdfObj = null;

  private baseURI: string = this.global.mysite;
  public items: Array<any> = [];

  private idtr: any;
  private jmlh : any; 
  private trkh : any;
  private idjnstrnsks : any;
  private sttstrs : any;
  private sttsdoc : any;
  private docaccept : any;
  private docgive : any;
  private descdoc : any;
  

  constructor(public global: GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl : ToastController,
    public http: HttpClient,
    public storage: Storage,
    private plt: Platform,
    private file: File, private fileOpener: FileOpener
    ) {
  }
  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();//load_table(this.navParams.get("data"));
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
  /*ionViewDidLoad() {
    //this.load();
    console.log('ionViewDidLoad HistoryPage');
    console.log(this.idtr);
  } */

  ionViewWillEnter() {
    if (this.navParams.get("record")) {
      this.selectEntry(this.navParams.get("record"));
    }
    this.load();
  }


  selectEntry(item: any): void {
    this.idtr = item.id_transaksi;
    this.jmlh = item.jumlah;
    this.trkh = item.tarikh;
    this.idjnstrnsks = item.id_jenistransaksi;
    this.sttstrs = item.statustransaction;
    this.sttsdoc = item.status_dokumen;
    this.docaccept = item.doc_acceptby;
    this.docgive = item.doc_giveby;
    this.descdoc = item.description;

    if (this.sttsdoc=="YES"){ this.sttsdoc="Dokumen Telah Diterima"; } 
    else if(this.sttsdoc=="NO") { this.sttsdoc="Dokumen Belum Diterima"; } 
    else { this.sttsdoc="HistoryDetail.ts"; }

    console.log("idtr", this.idtr);
    console.log("jmlh", this.jmlh);
    console.log("trkh", this.trkh);
    console.log("idjnstrnsks", this.idjnstrnsks);
    console.log("sttstrs", this.sttstrs);
    console.log("sttsdoc", this.sttsdoc);
    console.log("docaccept", this.docaccept);
    console.log("docgive", this.docgive);
  }


  load(): void {
    this.storage.get('user').then((user) => {
      //this.idtr = this.navParams.get("param");
      console.log("hahaha", this.idtr);
      
      console.log("hahaha" + this.idtr);
      let url: any = this.baseURI + 'r_dhistory.php?id=' + user +"&idtr=" + this.idtr;
      this.http.get(url).subscribe((data: any) => {
        //console.dir(data);
        this.items = data;
      },
        (error: any) => {
          console.dir(error);
        });
      //--------------------------------------------------
    }); //close storage
  }

  generate(){

    let self = this;
    var docDefinition = {
      content: [
        { text: 'Resit Pembayaran Cashless UniSZA', style: 'header' },
        { text: 'Status :  ' + this.sttsdoc, style: 'subheader' },
        { text: 'No. Rujukan :' , style: 'subheader' },
        { text: 'Tarikh Transaksi :' + this.trkh , style: 'subheader' },

        { text: 'Ketrangan Transaksi :' , style: 'subheader' },
        this.descdoc,

        { text: 'Dibayar Oleh :' + this.docgive , style: 'subheader' },
        { text: 'ID Merchant :'  , style: 'subheader' },
        { text: 'Jenis Kad :' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: '' , style: 'subheader' },
        { text: 'Catatan :'  , style: 'subheader' },
        'Resit ini dijana oleh komputer, tiada tandatangan diperlukan.'



      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);
    pdfMake.createPdf(docDefinition).getBuffer(function (buffer) {
      let utf8 = new Uint8Array(buffer);
      let binaryArray = utf8.buffer;
      self.saveToDevice(binaryArray,"Resit.pdf")
      });

    //this.downloadPdf();
  }


  saveToDevice(data:any,savefile:any){
    let self = this;
    self.file.writeFile(self.file.externalDataDirectory , savefile, data, {replace:false});
    const toast = self.toastCtrl.create({
    message: 'File saved to your device',
    duration: 3000,
    position: 'top'
    });
    toast.present();
    }


    downloadPdf(){
        if (this.plt.is('cordova')) {
          this.pdfObj.getBuffer((buffer) => {
            var blob = new Blob([buffer], { type: 'application/pdf' });
    
            // Save the PDF to the data Directory of our App
            this.file.writeFile(this.file.dataDirectory , 'Resit.pdf', blob, { replace: false }).then(fileEntry => {
              // Open the PDf with the correct OS tools
              //this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
              this.fileOpener.open(this.file.dataDirectory + 'Resit.pdf', 'application/pdf');
            })
          });
        } else {
          // On a browser simply use download!
          this.pdfObj.download();
        }
    }
}
