import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AppGlobalService } from './app-global.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
export class ApiService {

  BASE_URL = "https://covidapi.info/api/v1/global"
  error = '';
  public data:any = [];
  constructor(
    private http: HTTP,
    private _global: AppGlobalService,
    private _httpClient: HttpClient
  ) { }
  
  getItems() {
    return this._callGetAPI('/get_items', {})
  }
  getInfo() {
      return this._callGetAPI('',{});
  }

  getCountry() {
    return this._callGetAPI('/latest', {})
  }
  getTableData() {
    return this._callGetAPI('/latest', {})
  }
  getNews() {
    return this._httpClient.get('https://newsapi.org/v2/top-headlines?q=coronavirus&language=en&apiKey=YOUR_OWN_KEY');
  }
  getCountryWiseRecord(yourCountry) {
    console.log('https://covidapi.info/api/v1/country/' + yourCountry + '/latest');

    return this._httpClient.get('https://covidapi.info/api/v1/country/' + yourCountry + '/latest');
  }
  getCurrentWeekData(yourCountry, startDate, endDate) {
    console.log('https://covidapi.info/api/v1/country/' + yourCountry + '/timeseries/' + startDate + '/' + endDate);
    return this._httpClient.get('https://covidapi.info/api/v1/country/' + yourCountry + '/timeseries/' + startDate + '/' + endDate);
  }
  

  _callGetAPI(url: string, params: any) {
    return this._httpClient.get(this.BASE_URL + url);
  }
    //   _callGetAPI(url: string, params: any): Observable<any> {
    //     return this._httpClient.get(this.BASE_URL).pipe(
    //       map((res: any) => res.json()),
    //       catchError(<T>(error: any, result?: T) => {
    //         console.log(error);
    //         return error;
    //       })
    //     );
    //   }
}

