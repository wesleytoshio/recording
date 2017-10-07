import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TranslateProvider {

  constructor(public http: Http) {
    console.log('Hello TranslateProvider Provider');
  }
  save(data){
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      let options = new RequestOptions({ headers: headers });
      this.http.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBmZYL04Qvmr_j3B3jIq0yMuaJlP6O1eNQ', {
        "source": "pt-BR",
        "q":data,
        "target": "en"
       }, options)
      .subscribe(response=>{
       let json = response.json();
        resolve(json);
      },
      response=>{
        let json = response.json();
        console.log(json);
      })
    });
  }
}
