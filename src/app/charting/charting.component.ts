import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment/moment';
import { Observable } from 'rxjs';
import * as fromCharting from './reducers';
import { initialState } from './reducers/charting.reducer';
import * as ChartingActions from './actions/charting.actions';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { state_hash, enumSelector } from '../core/states';


@Component({
  selector: 'app-charting',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.scss']
})
export class ChartingComponent implements OnInit {

  $chartData: Observable<ChartDataSets[]>;
  $deathData: Observable<ChartDataSets[]>;
  $infectionData: Observable<ChartDataSets[]>;
  $hospitalData: Observable<ChartDataSets[]>;
  $testsData: Observable<ChartDataSets[]>;
  $chartLabels: Observable<moment.Moment[]>;
  $startDate: Observable<Date>;
  $endDate: Observable<Date>;
  $chartTitle: Observable<string>;
  $loading: Observable<boolean>;
  minDate: Date;
  maxDate: Date;
  states = enumSelector(state_hash);
  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,120,0.25)',
      backgroundColor: 'rgba(50,120,50,0.0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(50,50,255,0.75)',
    },
  ];

  deathChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,120,0.25)',
      backgroundColor: 'rgba(50,120,50,0.0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(50,50,255,0.75)',
    },
  ];

  hospitalChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,120,0.25)',
      backgroundColor: 'rgba(255,120,50,0.0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(255,50,255,0.75)',
    },
  ];

  infectionChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,120,0.25)',
      backgroundColor: 'rgba(50,255,50,0.0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(120,120,120,0.75)',
    },
  ];

  testChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,120,0.25)',
      backgroundColor: 'rgba(50,120,255,0.0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(50,50,0,0.75)',
    },
  ];

  constructor(private store: Store<fromCharting.State>) { }

  ngOnInit(): void {
    this.$chartData = this.store.select(fromCharting.selectChartingDataForSelected);
    this.$deathData = this.store.select(fromCharting.selectChartingDataForDeaths);
    this.$infectionData = this.store.select(fromCharting.selectChartingDataForInfected);
    this.$hospitalData = this.store.select(fromCharting.selectChartingDataForHospitalized);
    this.$testsData = this.store.select(fromCharting.selectChartingDataForTests);

    this.$chartLabels = this.store.select(fromCharting.selectChartingChartLabels);
    this.$startDate = this.store.select(fromCharting.selectStartDateToDate);
    this.$endDate = this.store.select(fromCharting.selectEndDateToDate);
    this.$chartTitle = this.store.select(fromCharting.selectChartTitle);
    this.maxDate = new Date(initialState.endDate);
    this.minDate = new Date(initialState.startDate);
    this.$loading = this.store.select(fromCharting.selectChartingLoading);
  }

  endDateChanged(val: string) {
    this.store.dispatch(ChartingActions.SET_END_DATE({ ed: val }));
  }

  startDateChanged(val: string) {
    this.store.dispatch(ChartingActions.SET_START_DATE({ sd: val }));
  }

  nationStateValueChanged(val: string) {
    this.store.dispatch(ChartingActions.SET_CURRENT_SELECTION({selection: val}));
  }

}
