import { createReducer, on } from '@ngrx/store';
import * as fromUI from './actions/ui.actions';

export interface State {
    sideNavToggle: boolean;         
};

const initialState: State = {
    sideNavToggle: false   
};

export const reducer = createReducer(
    initialState,
    on(
        fromUI.TOGGLE_SIDE_NAV,
        (state) => ({...state, sideNavToggle: !state.sideNavToggle}),
    ),
);

export const getsideNavToggle = (state: State) => state.sideNavToggle;