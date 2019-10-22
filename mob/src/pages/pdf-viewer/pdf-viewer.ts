import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'page-pdf-viewer',
  templateUrl: 'pdf-viewer.html',
  //template: "<pdf-viewer [src]='pdfSrc' [render-text]='true' style='display: block;'></pdf-viewer>"
})
export class PdfViewerPage {

  displayData: any = {};
  //pdfSrc = "http://18.136.211.207:4400/api/v1/view/certificate?certificateId=5dada31e1ee2f866423900ff&fileId=5dada3271ee2f8664239011a";
  //pdfSrc = "https://drive.google.com/file/d/1eB5QBlK32ANUbzNrWyAu1SXqnxk0ORIw/view";
  pdfSrc = "../../assets/documents/cert.pdf";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    //private document: DocumentViewer
  ) { }
  

  ionViewDidLoad() {
    console.log(this.navParams);
    //this.displayData = this.navParams.get('displayData');
    
  }

  onClose(): void {
    this.viewCtrl.dismiss();
  }


}