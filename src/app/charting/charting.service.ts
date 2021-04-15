import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as env from 'src/environments/environment';
import { NationalCovidDay } from './models/NationalCovidDay';
import { StateCovidDay } from './models/StateCovidDay';

@Injectable({
  providedIn: 'root'
})
export class ChartingService {

  constructor(private http: HttpClient) { }

  getNationalCovidData() {
    return this.http.get<any[]>(env.environment.nationalAPIURL);    
  }

  getStateCovidData(state: string) {
    return this.http.get<any[]>(env.stateAPIURL(state));
  }

  getCovidData(state: string) {
    state = state.toLocaleLowerCase();
    return (state == 'us') ? this.getNationalCovidData() : this.getStateCovidData(state);
  }
}
