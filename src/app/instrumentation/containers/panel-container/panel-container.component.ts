import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as InstrumentActions from '../../actions/instrumentation.actions';
import * as fromInstruments from '../../reducers';



@Component({
  selector: 'app-panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.scss']
})
export class PanelContainerComponent implements OnInit, OnDestroy {

  gasThresholds = {
      '0': { color: 'red' },
      '2.5': { color: 'gold' },
      '4': { color: 'forestgreen' }
    };

  RPMThresholds = {
    '0': { color: 'forestgreen'},
    '5000': { color: 'gold'},
    '5500': { color: 'red'}
  };  

  fuel$: Observable<number>;
  wind$: Observable<number>;
  temp$: Observable<number>;
  speed$: Observable<number>;
  rpm$: Observable<number>;
  started$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnDestroy(): void {
    this.stop();
  }

  ngOnInit(): void {
    this.fuel$ = this.store.select(fromInstruments.selectInstrumentFuel);
    this.wind$ = this.store.select(fromInstruments.selectInstrumentWind);
    this.temp$ = this.store.select(fromInstruments.selectInstrumentTemp);
    this.speed$ = this.store.select(fromInstruments.selectInstrumentSpeed);
    this.rpm$ = this.store.select(fromInstruments.selectInstrumentRPM);
    this.started$ = this.store.select(fromInstruments.selectInstrumentStarted);
  }

  start() {
    this.store.dispatch(InstrumentActions.INSTRUMENT_START());
  }

  stop() {
    this.store.dispatch(InstrumentActions.INSTRUMENT_STOP());
  }
}
