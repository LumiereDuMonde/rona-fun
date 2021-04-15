import { createReducer, on} from "@ngrx/store";
import * as ChartingActions from '../actions/charting.actions';
import { CovidData } from "../models/CovidData.model";
import { CovidChartTypes } from "../models/CovidChartTypes";


export interface State {    
    everLoaded: boolean;    
    error: string;
    loading: boolean;
    covidData: CovidData[]
    selected: string;
    startDate: string;
    endDate: string;
    selectedType: string;
};

export const initialState : State = {
    everLoaded: false,
    error: null,
    loading: false,
    covidData: [],    
    selected: 'US',
    startDate: '01/01/2020',
    endDate: '03/08/2021',
    selectedType:  CovidChartTypes.Deaths
}

export const chartingFeatureKey = 'charting'; 

export const reducer = createReducer(
    initialState,
    on(ChartingActions.GET_COVID_DATA_START, state => ({ ...state, loading: true })),
    on(ChartingActions.GET_COVID_DATA_SUCCESS, (state, action) => ({...state, loading: false, everLoaded: true, covidData: [...action.data]})),
    on(ChartingActions.GET_COVID_DATA_FAILURE,(state, action) => ({...state, loading: false, error: action.errorMsg})),
    on(ChartingActions.SET_DATE_RANGE,(state,action)=>({...state,startDate: action.sd, endDate: action.ed})),
    on(ChartingActions.SET_START_DATE,(state,action)=>({...state,startDate: action.sd})),
    on(ChartingActions.SET_END_DATE,(state,action)=>({...state,endDate: action.ed})),
    on(ChartingActions.SET_CURRENT_SELECTION,(state,action) => ({...state, loading: true,selected: action.selection}))
);

export const getEverLoaded = (state: State) => state.everLoaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getCovidData = (state: State) => state.covidData;
export const getStartDate = (state: State) => state.startDate;
export const getEndDate = (state: State) => state.endDate;
export const getSelected = (state: State) => state.selected;
export const getSelectedType = (state: State) => state.selectedType;