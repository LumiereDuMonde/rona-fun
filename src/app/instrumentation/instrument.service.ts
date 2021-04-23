import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Instrumentation } from './models/instrumentation.model';
import * as InstrumentActions from './actions/instrumentation.actions';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService implements OnInit, OnDestroy {

  private currentSpeed = 0;
  private currentGas = 0;
  private currentWind = 0;
  private currentRPM = 0;
  private currentTemp = 0;

  private stop: Subject<void> = new Subject();

  constructor(private store: Store) { }


  startCollection() {
    this.currentGas = 4.2;
    this.currentSpeed = 67;
    this.currentWind = 5.5;
    this.currentRPM = 4500;
    this.currentTemp = 76;

    // update Speed every 500ms
    timer(0, 500)
      .pipe(
        takeUntil(this.stop)
      ).subscribe(() => {        
        let adjustment = this.randomInRange(-3.0, 3.0);
        // don't go below 0 and above 100 mph      
        this.currentSpeed += (this.currentSpeed + adjustment) > 0 && (this.currentSpeed + adjustment < 100) ? adjustment : 0;
        // ran out of gas
        this.currentSpeed = (this.currentGas <= 0) ? 0 : this.currentSpeed;    
        this.store.dispatch(InstrumentActions.INSTRUMENT_SPEED_UPDATE({val: this.roundToTenth(this.currentSpeed)}));    
      });

    // update Gas every 2s
    timer(0,2000)
      .pipe(
        takeUntil(this.stop)
      ).subscribe(() => {
        let adjustment = -0.1;        
        this.currentGas += (this.currentGas + adjustment > 0) ? adjustment : (this.currentGas * -1);       
        this.store.dispatch(InstrumentActions.INSTRUMENT_FUEL_UPDATE({val: this.roundToTenth(this.currentGas)})); 
      });

    // update RPM every 200ms
    timer(0, 200)
      .pipe(
        takeUntil(this.stop)
      ).subscribe(() => {
        let adjustment = this.randomInRange(-100, 105);
        // don't go below 0 and above 6000      
        this.currentRPM += (this.currentRPM + adjustment) > 0 && (this.currentRPM + adjustment < 6000) ? adjustment : 0;
        // ran out of gas
        this.currentRPM = (this.currentGas <= 0) ? 0 : this.currentRPM;
        this.store.dispatch(InstrumentActions.INSTRUMENT_RPM_UPDATE({val: Math.trunc(this.currentRPM)})); 
      });

    // update Wind every 1s
    timer(0, 1000)
      .pipe(
        takeUntil(this.stop)
      ).subscribe(() => {
        let adjustment = this.randomInRange(-1.0, 1.0);
        // don't go below 3 and above 7
        this.currentWind += (this.currentWind + adjustment) > 3 && (this.currentWind + adjustment < 7) ? adjustment : 0;
        this.store.dispatch(InstrumentActions.INSTRUMENT_WIND_UPDATE({val: this.roundToTenth(this.currentWind)}));
      });

    // update Temp every 10s
    timer(0, 10000)
      .pipe(
        takeUntil(this.stop)
      ).subscribe(() => {
        let adjustment = this.randomInRange(-1.0, 1.0);
        // don't go below 74 and above 80
        this.currentTemp += ((this.currentTemp + adjustment) > 74) && (this.currentTemp + adjustment < 80) ? adjustment : 0;
        this.store.dispatch(InstrumentActions.INSTRUMENT_TEMP_UPDATE({val: this.roundToTenth(this.currentTemp)}));
      });
  }

  stopCollection() {
    this.currentGas = 0;
    this.currentSpeed = 0;
    this.currentWind = 0;
    this.currentRPM = 0;
    this.currentTemp = 0;    
    this.stop.next();    
  }

  randomInRange(min, max) {    
    return Math.random() * (max - min) + min;
  }

  getCurrentValues():  Instrumentation {    
    return {
      gas: this.roundToTenth(this.currentGas),
      wind: this.roundToTenth(this.currentWind),
      temp: this.roundToTenth(this.currentTemp),
      mph: this.roundToTenth(this.currentSpeed),
      rpm: Math.trunc(this.currentRPM)
    }
  };

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {    
    this.stop.next();
  }

  roundToTenth(val : number) : number {
    return Math.round(val * 10) / 10;
  }
}
