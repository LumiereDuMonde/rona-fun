import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NationalCovidDay } from './models/NationalCovidDay';

@Injectable({
  providedIn: 'root'
})
export class ChartingService {

  constructor(private http: HttpClient) { }

  getNationalCovidData() {
    return this.http.get<NationalCovidDay[]>(environment.nationalAPIURL);    
  }
}
