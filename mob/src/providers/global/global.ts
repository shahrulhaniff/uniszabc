import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  //public mysite : string  = "http://172.17.216.193/cashweb/app/"; 
  //public mysite : string  = "http://192.168.43.194/cashweb/app/"; 
  public mysite : string  = "http://localhost/uniszabc/api/";
  //public mysite : string  = "https://cashless1234.000webhostapp.com/app/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}