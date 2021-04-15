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

/**
* The createFeatureSelector function selects a piece of state from the root of the state object.
* This is used for selecting feature states that are loaded eagerly or lazily.
*/
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
)

export const selectStartDateToDate = createSelector(
  selectStartDate,
  (d: string) => { return new Date(d) }
)

export const selectAllChartingData = createSelector(
  selectCovidData,
  selectStartDateToDate,
  selectEndDateToDate,
  (d: CovidData[], sd: Date, ed: Date) => {
    const dateFilteredData = d.filter((a) => { return a.date >= sd && a.date <= ed });
    return {
      [CovidChartTypes.Deaths]: [{ data: dateFilteredData.map(i => i.getData(CovidChartTypes.Deaths)), label: CovidData.getLabel(CovidChartTypes.Deaths), type: "line", yAxisID: 'left-axis' },
      { data: dateFilteredData.map(i => i.getData(CovidChartTypes.Deaths, true)), label: CovidData.getLabel(CovidChartTypes.Deaths, true), type: "bar", yAxisID: 'right-axis' }],
      [CovidChartTypes.Hospitalized]: [{ data: dateFilteredData.map(i => i.getData(CovidChartTypes.Hospitalized)), label: CovidData.getLabel(CovidChartTypes.Hospitalized), type: "line", yAxisID: 'left-axis' },
      { data: dateFilteredData.map(i => i.getData(CovidChartTypes.Hospitalized, true)), label: CovidData.getLabel(CovidChartTypes.Hospitalized, true), type: "bar", yAxisID: 'right-axis' }],
      [CovidChartTypes.Infections]: [{ data: dateFilteredData.map(i => i.getData(CovidChartTypes.Infections)), label: CovidData.getLabel(CovidChartTypes.Infections), type: "line", yAxisID: 'left-axis' },
      { data: dateFilteredData.map(i => i.getData(CovidChartTypes.Infections, true)), label: CovidData.getLabel(CovidChartTypes.Infections, true), type: "bar", yAxisID: 'right-axis' }],
      [CovidChartTypes.Tests]: [{ data: dateFilteredData.map(i => i.getData(CovidChartTypes.Tests)), label: CovidData.getLabel(CovidChartTypes.Tests), type: "line", yAxisID: 'left-axis' },
      { data: dateFilteredData.map(i => i.getData(CovidChartTypes.Tests, true)), label: CovidData.getLabel(CovidChartTypes.Tests, true), type: "bar", yAxisID: 'right-axis' }]
    }
  }
)

export const selectChartingDataForDeaths = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[CovidChartTypes.Deaths];
  }
)

export const selectChartingDataForInfected = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[CovidChartTypes.Infections];
  }
)

export const selectChartingDataForHospitalized = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[CovidChartTypes.Hospitalized];
  }
)

export const selectChartingDataForTests = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[CovidChartTypes.Tests];
  }
)

export const selectChartingDataForSelected = createSelector(
  selectAllChartingData,
  selectSelectedType,
  (d, st: string) => {
    return d[st];
  }
)

export const selectChartingChartLabels = createSelector(
  selectCovidData,
  selectStartDateToDate,
  selectEndDateToDate,
  (d: CovidData[], sd: Date, ed: Date) => { return d.filter((a) => { return a.date >= sd && a.date <= ed }).map(i => moment(i.date)) }
)

export const selectChartTitle = createSelector(
  selectSelected,
  selectSelectedType,
  (selected: string, selectedType: string) => `${selectedType} for ${state_hash[selected]}`
)