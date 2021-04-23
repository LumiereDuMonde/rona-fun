import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';

import * as fromInstruments from './instrumentation.reducer';
import * as fromRoot from '../../store/app.reducer';


export const instrumentFeatureKey = 'instrument';

export interface InstrumentState {
    [fromInstruments.instrumentFeatureKey]: fromInstruments.State;
}

export interface State extends fromRoot.State {
    [instrumentFeatureKey]: InstrumentState;
}

export function reducers(state: InstrumentState | undefined, action: Action) {
    return combineReducers({
        [fromInstruments.instrumentFeatureKey]: fromInstruments.reducer
    })(state, action);
}

export const selectInstrumentationState = createFeatureSelector<State, InstrumentState>(
    instrumentFeatureKey
);

export const selectInstrumentState = createSelector(
    selectInstrumentationState,
    (state) => state.instruments
);

export const selectInstrumentStarted = createSelector(
    selectInstrumentState,
    fromInstruments.getStarted
);

export const selectInstrumentFuel = createSelector(
    selectInstrumentState,
    fromInstruments.getFuel
);

export const selectInstrumentWind = createSelector(
    selectInstrumentState,
    fromInstruments.getWind
);

export const selectInstrumentRPM = createSelector(
    selectInstrumentState,
    fromInstruments.getRPM
);

export const selectInstrumentSpeed = createSelector(
    selectInstrumentState,
    fromInstruments.getSpeed
);

export const selectInstrumentTemp = createSelector(
    selectInstrumentState,
    fromInstruments.getTemp
);