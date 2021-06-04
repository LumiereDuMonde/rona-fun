import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  // just a super quick and dirty service to create the random data from the UI elements on the screen.

  private telemetryData1 = new BehaviorSubject<string[]>(["0","0","0"]);  
  private telemetryData2 = new BehaviorSubject<Array<string>>(["0","0","0"]);
  private telemetryData3 = new BehaviorSubject<Array<string>>(["0","0","0"]);
  handle1: any;
  handle2: any;
  handle3: any;

  constructor() { }

  generateRandomString() {
    return (Math.random()*100).toString().slice(0,10);
  }

  start() {
    this.handle1 = setInterval(() => {
      this.telemetryData1.next([this.generateRandomString(), this.generateRandomString(), this.generateRandomString()]);      
    }, 100);
    this.handle2 = setInterval(() => {
      this.telemetryData2.next([this.generateRandomString(), this.generateRandomString(), this.generateRandomString()]);
    }, 120);
    this.handle3 = setInterval(() => {
      this.telemetryData3.next([this.generateRandomString(), this.generateRandomString(), this.generateRandomString()]);
    }, 80);
  }

  stop() {
    clearInterval(this.handle1);
    clearInterval(this.handle2);
    clearInterval(this.handle3);
  }

  getData1() {
    return this.telemetryData1.asObservable();
  }

  getData2() {
    return  this.telemetryData2.asObservable();
  }

  getData3() {
    return  this.telemetryData3.asObservable();
  }
}
