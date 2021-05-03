import * as moment from 'moment/moment';

import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';

import * as fromCharting from './charting.reducer';
import * as fromRoot from '../../store/app.reducer';
import { CovidData } from "../models/CovidData.model";
import { state_hash } from 'src/app/core/states';
import { CovidChartTypes } from '../models/CovidChartTypes';

export const chartFeatureKey = 'chart';

export interface ChartState {
  [fromCharting.chartingFeatureKey]: fromCharting.State;
}

export interface State extends fromRoot.State {
  [chartFeatureKey]: ChartState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: ChartState | undefined, action: Action) {
  return combineReducers({
    [fromCharting.chartingFeatureKey]: fromCharting.reducer
  })(state, action);
}

export const selectChartState = createFeatureSelector<State, ChartState>(
  chartFeatureKey
);

export const selectChartingState = createSelector(
  selectChartState,
  (state) => state.charting
);

export const selectChartingLoading = createSelector(
  selectChartingState,
  fromCharting.getLoading
);

export const selectChartingEverLoaded = createSelector(
  selectChartingState,
  fromCharting.getEverLoaded
);

export const selectChartingError = createSelector(
  selectChartingState,
  fromCharting.getError
);

export const selectCovidData = createSelector(
  selectChartingState,
  fromCharting.getCovidData
);

export const selectSelected = createSelector(
  selectChartingState,
  fromCharting.getSelected
);

export const selectSelectedType = createSelector(
  selectChartingState,
  fromCharting.getSelectedType
);

export const selectStartDate = createSelector(
  selectChartingState,
  fromCharting.getStartDate
);

export const selectEndDate = createSelector(
  selectChartingState,
  fromCharting.getEndDate
);

export const selectEndDateToDate = createSelector(
  selectEndDate,
  (d: string) => { return new Date(d) }
);

export const selectStartDateToDate = createSelector(
  selectStartDate,
  (d: string) => { return new Date(d) }
);

export function returnComputedChartData (d: CovidData[], chartType: CovidChartTypes) {
  return [{ data: d.map(i => i.getData(chartType)), label: CovidData.getLabel(chartType), type: "line", yAxisID: 'left-axis', empty: false },
  { data: d.map(i => i.getData(chartType, true)), label: CovidData.getLabel(chartType, true), type: "bar", yAxisID: 'right-axis', empty: false }]  
}

export function checkEmpty(data: number[]): boolean {
  return !data.some((v) => {
    return (!!v);
  })
}

export const selectAllChartingData = createSelector(
  selectCovidData,
  selectStartDateToDate,
  selectEndDateToDate,
  (d: CovidData[], sd: Date, ed: Date) => {
    const dateFilteredData = d.filter((a) => { return a.date >= sd && a.date <= ed });
    const computedData = {
      [CovidChartTypes.Deaths]: returnComputedChartData(dateFilteredData, CovidChartTypes.Deaths),
      [CovidChartTypes.Hospitalized]: returnComputedChartData(dateFilteredData, CovidChartTypes.Hospitalized),
      [CovidChartTypes.Infections]: returnComputedChartData(dateFilteredData, CovidChartTypes.Infections),
      [CovidChartTypes.Tests]: returnComputedChartData(dateFilteredData, CovidChartTypes.Tests)
    };
    computedData.Hospitalized[0].empty =  checkEmpty(computedData.Hospitalized[0].data);
    computedData.Hospitalized[1].empty =  checkEmpty(computedData.Hospitalized[1].data);
    computedData.Infections[0].empty =  checkEmpty(computedData.Infections[0].data);
    computedData.Infections[1].empty =  checkEmpty(computedData.Infections[1].data);
    computedData.Tests[0].empty =  checkEmpty(computedData.Tests[0].data);
    computedData.Tests[1].empty =  checkEmpty(computedData.Tests[1].data);  
    computedData.Deaths[0].empty =  checkEmpty(computedData.Deaths[0].data);  
    computedData.Deaths[1].empty =  checkEmpty(computedData.Deaths[1].data); 
    return computedData;
  }
);

export const selectChartingDataForDeaths = createSelector(
  selectAllChartingData,  
  (d) => {
    return d[CovidChartTypes.Deaths];
  }
);

export const selectChartingDataForInfected = createSelector(
  selectAllChartingData,  
  (d) => {
    return d[CovidChartTypes.Infections];
  }
);

export const selectChartingDataForHospitalized = createSelector(
  selectAllChartingData,  
  (d) => {
    return d[CovidChartTypes.Hospitalized];
  }
);

export const selectChartingDataForTests = createSelector(
  selectAllChartingData,  
  (d) => {
    return d[CovidChartTypes.Tests];
  }
);

export const selectChartingDataForSelected = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[st];
  }
);

export const selectChartingChartLabels = createSelector(
  selectCovidData,
  selectStartDateToDate,
  selectEndDateToDate,
  (d: CovidData[], sd: Date, ed: Date) => { return d.filter((a) => { return a.date >= sd && a.date <= ed }).map(i => moment(i.date)) }
);

export const selectChartTitle = createSelector(
  selectSelected,
  selectSelectedType,
  (selected: string, selectedType: string) => `${selectedType} for ${state_hash[selected]}`
);