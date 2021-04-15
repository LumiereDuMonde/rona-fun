import { createAction, props } from "@ngrx/store";
import { CovidData } from "../models/CovidData.model";

export const GET_COVID_DATA_START = createAction('[Charting] Get COVID Data');
export const GET_COVID_DATA_SUCCESS = createAction('[Charting] Get COVID Data Success', props<{data: CovidData[]}>());
export const GET_COVID_DATA_FAILURE = createAction('[Charting] Get COVID Data Failure', props<{errorMsg: string}>());
export const SET_DATE_RANGE = createAction('[Charting] set Date range', props<{sd: string, ed: string}>());
export const SET_START_DATE = createAction('[Charting] set Start Date', props<{sd: string}>());
export const SET_END_DATE = createAction('[Charting] set  End Date', props<{ed: string}>());
export const SET_CURRENT_SELECTION = createAction('[Charting] Set Current Selection', props<{selection: string}>());