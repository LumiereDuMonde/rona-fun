import { createAction, props } from "@ngrx/store";

// Traffic cop redistributes traffic based on type (trade and book currently) and if it is an event or data
// events are objects and data are arrays

export const TRADE_TRAFFIC = createAction('[Trading Traffic] new traffic', props<{data: any}>());
export const TRADE_TRAFFIC_UNHANDLED = createAction('[Trading Traffic] Traffic Cop unhandled traffic', props<{data: any}>());