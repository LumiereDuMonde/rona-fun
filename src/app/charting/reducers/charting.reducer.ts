import { createReducer, on} from "@ngrx/store";
import * as ChartingActions from '../actions/charting.actions';
import { NationalCovidDay } from "../models/NationalCovidDay";

export interface State {    
    everLoaded: boolean;    
    error: string;
    loading: boolean;
    national: NationalCovidDay[];
};

const initialState : State = {
    everLoaded: false,
    error: null,
    loading: false,
    national: []
}

export const chartingFeatureKey = 'charting'; 

export const reducer = createReducer(
    initialState,
    on(ChartingActions.GET_COVID_DATA_START, state => ({ ...state, loading: true })),
    on(ChartingActions.GET_COVID_DATA_SUCCESS, (state, action) => ({...state, loading: false, everLoaded: true, national: [...action.data]})),
    on(ChartingActions.GET_COVID_DATA_FAILURE,(state, action) => ({...state, loading: false, error: action.errorMsg}))
);

export const getEverLoaded = (state: State) => state.everLoaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getNationalData = (state: State) => state.national;
