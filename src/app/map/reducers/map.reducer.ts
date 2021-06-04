import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../actions/map.actions';

export interface State {
    error: string;      // errors from the google maps API
    address: string; // holds formatted address         
    loc: google.maps.LatLngBoundsLiteral | null;
};

const initialState: State = {
    error: null,
    address: null,
    loc: null
};

export const reducer = createReducer(
    initialState,
    on(
        MapActions.CHANGE_LOCATION,
        (state, action) => ({...state, address: action.address, loc: {...action.loc}}),
    ),
);