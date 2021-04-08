import { createAction, props } from "@ngrx/store";
import { NationalCovidDay } from "../models/NationalCovidDay";

export const GET_COVID_DATA_START = createAction('[Charting] Get COVID Data');
export const GET_COVID_DATA_SUCCESS = createAction('[Charting] Get COVID Data Success', props<{data: NationalCovidDay[]}>());
export const GET_COVID_DATA_FAILURE = createAction('[Charting] Get COVID Data Failure', props<{errorMsg: string}>());