import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as AuthActions from '../actions/auth.actions';

export interface State {
    user: User;    
    loading: boolean; 
    loggedIn: boolean;
    errorMsg: string;
};

const initialState: State = {
    user: null,
    loading: false,
    loggedIn: false,
    errorMsg: null
};

export const authStateFeatureKey = 'authState'; 

export const getUser = (state: State) => state.user;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.errorMsg;

export const reducer = createReducer(
    initialState,
    on(
        AuthActions.SIGNUP_START,
        (state) => ({...state, loading: true, errorMsg: initialState.errorMsg}),
    ),    
    on(
        AuthActions.LOGIN_START,
        (state) => ({...state, loading: true, errorMsg: initialState.errorMsg}),
    ),
    on(
        AuthActions.LOGIN_SUCCESS,
        (state, action) => ({...state, user: action.user, loading: false, loggedIn: true, errorMsg: initialState.errorMsg}),
    ),  
    on(
        AuthActions.AUTOLOGIN_SUCCESS,
        (state, action) => ({...state, user: action.user, loading: false, loggedIn: true, errorMsg: initialState.errorMsg}),
    ),      
    on(
        AuthActions.LOGOUT,
        (state) => ({...initialState})
    ),
    on(
        AuthActions.LOGIN_FAILURE,
        (state, action) => ({...state, loading: false, errorMsg: action.error})
    )
);