import { NationalCovidDay } from "../models/NationalCovidDay";
import * as ChartingActions from '../actions/charting.actions';

import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
  } from '@ngrx/store';

  import * as fromCharting from './charting.reducer';
  import * as fromRoot from '../../store/app.reducer';

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

  export const selectChartingNationalData = createSelector(
    selectChartingState,
    fromCharting.getNationalData
  );  