import { createReducer, on } from '@ngrx/store';
import * as InstrumentActions from '../actions/instrumentation.actions';

export interface State {
    started: boolean;
    fuel: number;
    speed: number;
    wind: number;
    temperature: number;
    rpm: number;
};

const initialState: State = {
    started: false,
    fuel: 0,
    speed: 0,
    wind: 0,
    temperature: 0,
    rpm: 0
};

export const instrumentFeatureKey = 'instruments';

export const reducer = createReducer(
    initialState,
    on(
        InstrumentActions.INSTRUMENT_START_FINISHED,
        (state) => ({ ...state, started: true }),
    ),
    on(
        InstrumentActions.INSTRUMENT_STOP_FINISHED,
        (state) => ({ ...state, started: false, fuel: initialState.fuel, speed: initialState.speed, wind: initialState.wind, temperature: initialState.temperature, rpm: initialState.rpm }),
    ),
    on(InstrumentActions.INSTRUMENT_FUEL_UPDATE, (state,action) => ({...state, fuel: action.val})),
    on(InstrumentActions.INSTRUMENT_RPM_UPDATE, (state,action) => ({...state, rpm: action.val})),
    on(InstrumentActions.INSTRUMENT_SPEED_UPDATE, (state,action) => ({...state, speed: action.val})),
    on(InstrumentActions.INSTRUMENT_TEMP_UPDATE, (state,action) => ({...state, temperature: action.val})),
    on(InstrumentActions.INSTRUMENT_WIND_UPDATE, (state,action) => ({...state, wind: action.val})),    
);



export const getStarted = (state: State) => state.started;
export const getFuel = (state: State) => state.fuel;
export const getRPM = (state: State) => state.rpm;
export const getSpeed = (state: State) => state.speed;
export const getTemp = (state: State) => state.temperature;
export const getWind = (state: State) => state.wind;